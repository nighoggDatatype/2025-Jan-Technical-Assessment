import { Request, Response } from 'express';

// Define the shape of the request body
interface VerifyUENRequestBody {
    uen: string; // Single text field
}

export const isUENValid = (uen: string): boolean => {
    
    const typeA = "\\d{8}[A-Z]"
    const typeB_year = "(19|20)\\d{2}"
    const typeB = typeB_year + "\\d{5}[A-Z]"
    const typeC_year = "[ST]\\d{2}"
    const entityTypeList = [
        "LP","LL","FC","PF",
        "RF",
        "MQ","MM",
        "NB",
        "CC",
        "CS",
        "MB",
        "FM",
        "GS",
        "DP","CP","NR",
        "CM","CD","MD","HS","VH","CH","MH","CL","XL","CX","HC",
        "RP",
        "TU",
        "TC",
        "FB","FN",
        "PA","PB",
        "SS",
        "MC","SM",
        "GA","GB",
    ]
    const typeC_entityType = `(${entityTypeList.join("|")})`
    const typeC = typeC_year + typeC_entityType + "\\d{4}[A-Z]"
    const regexString = `^(${typeA}|${typeB}|${typeC})$`
    const re = new RegExp(regexString);
    return re.test(uen);
}

// Controller function to handle verification
export const verifyService1 = (req: Request<{}, {}, VerifyUENRequestBody>, res: Response): void => {
    const { uen } = req.body;

    if (!uen || typeof uen !== 'string') {
        res.status(400).send(`
            <div class="alert alert-danger" role="alert">
                Invalid input provided to the API. Please try again.
            </div>
          `);
        return;
    }

    if (isUENValid(uen)) {
        res.send(`
            <div class="alert alert-success" role="alert">
                UEN formatting correct
            </div>
          `);
    } else {
        res.send(`
            <div class="alert alert-danger" role="alert">
                UEN formatting invalid
            </div>
          `);
    }
};