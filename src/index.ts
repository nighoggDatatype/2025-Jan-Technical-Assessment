import path from "path";
import { fileURLToPath } from 'url';

import express from 'express';
const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true })); 

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse the requested URL
app.get('/:page', (req: any, res: any, next: any) => {
  const { page } = req.params;

  // Validate the requested page exists in the views folder
  const htmlTemplates = ['index', 'service1', 'service2']; // List of allowed EJS templates
  if (htmlTemplates.includes(page)) {
      res.render(page);
  } else {
      next();
  }
});

// Redirect root
app.get('/', (_req: any, res: { redirect: (arg0: string) => void; }) => {
    res.redirect('/index');
});

//Additional static files
app.use(express.static(path.join(__dirname, 'public')));

import { verifyService1 } from "./controllers/service1Controller.js";
app.use('/uen-validation',verifyService1)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
