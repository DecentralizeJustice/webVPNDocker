'use strict';
const express = require("express");
const path = require('path')
const ViteExpress = require("vite-express")
const { readFile } = require('fs/promises')
const _sodium = require('libsodium-wrappers');
const app = express();

app.get('/config', async (req, res) => {
  const fileName = path.join('config', '/', 'peer1', '/', 'peer1.conf')
  const config = await content(path.join(__dirname, fileName))  
  await _sodium.ready;
  const sodium = _sodium;

  let key = sodium.from_hex('724b092810ec86d7e35c9d067702b31ef90bc43a7b598626749914d6a3e033ed');
  function encrypt_and_prepend_nonce(message) {
    let nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
    return mergeTypedArrays(nonce, sodium.crypto_secretbox_easy(message, nonce, key))
  }
  const text = sodium.to_base64(encrypt_and_prepend_nonce(config))
  res.send(text)
  return
})
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

async function content(path) {  
  return await readFile(path, 'utf8')
}

function mergeTypedArrays(a, b) {
  // Checks for truthy values on both arrays
  if(!a && !b) throw 'Please specify valid arguments for parameters a and b.';  

  // Checks for truthy values or empty arrays on each argument
  // to avoid the unnecessary construction of a new array and
  // the type comparison
  if(!b || b.length === 0) return a;
  if(!a || a.length === 0) return b;

  // Make sure that both typed arrays are of the same type
  if(Object.prototype.toString.call(a) !== Object.prototype.toString.call(b))
      throw 'The types of the two arguments passed for parameters a and b do not match.';

  var c = new a.constructor(a.length + b.length);
  c.set(a);
  c.set(b, a.length);

  return c;
}