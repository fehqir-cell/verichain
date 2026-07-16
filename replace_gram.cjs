const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');
appJs = appJs.replace(/GRAM/g, 'TON');
appJs = appJs.replace(/payload:\s*''\s*\/\/[^\n]*\n/g, ''); // Remove payload: ''
appJs = appJs.replace(/state\.balances\.GRAM/g, 'state.balances.TON');
fs.writeFileSync('app.js', appJs);

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/GRAM/g, 'TON');
fs.writeFileSync('index.html', indexHtml);

console.log("Replaced GRAM with TON and removed payload: ''");
