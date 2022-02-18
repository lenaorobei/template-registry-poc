const fs = require('fs');

const myArgs = process.argv;
console.log('myArgs: ', myArgs);
//
// const registry = fs.readFileSync('registry.json');
// const registryObject= JSON.parse(registry);
//
//
//
// registryObject.push('new/template');
//
// const newData = JSON.stringify(registryObject);
//
//
// fs.writeFile('registry.json', newData, err => {
//     if(err) throw err;
//     console.log("New template was added");
// });
