const path = require("path")

const express = require('express')
const app = express()
const port = 3000

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req: any, res: { redirect: (arg0: string) => void; }) => {
    res.redirect('/index.html');
});

const {verifyService1} = require("./controllers/service1Controller.ts")
app.use('/uen-validation',verifyService1)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
