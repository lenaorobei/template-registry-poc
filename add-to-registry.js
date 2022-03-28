const fs = require('fs');
const myArgs = process.argv.slice(2);
const body = myArgs[0];

console.log(process.argv);
console.log(body);

/*
const registry = fs.readFileSync('registry.json');
const registryObject= JSON.parse(registry);

registryObject.push(pluginName);
const newData = JSON.stringify(registryObject);
fs.writeFile('registry.json', newData, err => {
    if(err) throw err;
    console.log('New template was added', newData);
});
*/
