'use strict';
const express = require("express");
const path = require('path')
const ViteExpress = require("vite-express")
const { readFile } = require('fs/promises')

const app = express();

/* app.get("/hello", (req, res) => {
  console.log("Current directory:", __dirname);
  res.send("Hello Vite + Vue!");
  return;
}); */
app.get('/config', async (req, res) => {
  const options = {
      root: path.join(__dirname)
  }
  console.log("Current directory:", __dirname);
  const fileName = path.join('config', '/', 'peer1', '/', 'peer1.conf')
  const text = await content(path.join(__dirname, fileName))  
  console.log(text)
})
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

async function content(path) {  
  return await readFile(path, 'utf8')
}