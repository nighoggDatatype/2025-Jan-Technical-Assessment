const path = require("path")

const express = require('express')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req: any, res: { redirect: (arg0: string) => void; }) => {
    res.redirect('/index.html');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
