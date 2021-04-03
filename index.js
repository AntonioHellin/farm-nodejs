// 'use strict';

const fs = require('fs');
const http = require('http'); // Network capabilities such as building a http server
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate'); // Import our own module

////////////////////////////////////////////////////////////////////
// FILES
////////////////////////////////////////////////////////////////////

// Synchronous (Blocking)

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File written!');

// Asynchronous (Non-blocking)

// const fs = require('fs');

// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });

// console.log('Reading file...');

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR!!!');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written');
//       });
//     });
//   });
// });

// console.log('Will read file!');

// LESSON 11: Creating a simple web server

////////////////////////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////////////////////////

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true })); // How to use slugify
console.log(slugs);
// Creating web server
const server = http.createServer((req, res) => {
  // Callback function executed each time that a new request hits the server

  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj
      .map(el => replaceTemplate(templateCard, el))
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

// console.log(server);

// Start listening for incoming requests on the local hist IP and port 8000
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
