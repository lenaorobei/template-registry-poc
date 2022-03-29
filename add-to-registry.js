import fs from 'fs' ;
import {v4 as uuidv4} from 'uuid';
import fetch from 'node-fetch';

const myArgs = process.argv.slice(2);
const packageData = JSON.parse(myArgs[0]);

console.log("GitHub repo: " + myArgs[1]);
console.log("NPM: " + myArgs[2])

// Grab stargazers count for the specified GitHub repo
const gitHubUrl = myArgs[1];
const repo = gitHubUrl.split('/').slice(-2).join('/');
const gitHubResponse = await fetch('https://api.github.com/repos/' + repo);
const stargazersCount = await gitHubResponse.text()['stargazers_count'];

// Create registry item object
const registryItem = {
    "id": uuidv4(),
    "author": packageData.author,
    "name": packageData.name,
    "description": packageData.description,
    "latestVersion": packageData.version,
    "publishDate": new Date(Date.now()),
    // ToDo: get date from user input or keywords
    "extensionPoints": [
        "dx-spa",
        "dx-commerce"
    ],
    "categories": [
        "aio-action",
        "aio-graphql"
    ],
    "adobeRecommended": stargazersCount > 10,
    "keywords": packageData.keywords,
    "links": {
        "npm": myArgs[2],
        "github": gitHubUrl
    }
}

// Check for duplicates
const registry = JSON.parse(fs.readFileSync('registry.json'));
if (registry.filter(e => e.name === registryItem.name).length > 0) {
    throw new Error('Template with name `' + registryItem.name + '` already exists in Template Registry.')
}

// Add to the registry
registry.push(registryItem);
const newData = JSON.stringify(registry, null, "  ");
fs.writeFile('registry.json', newData, err => {
    if (err) throw err;
    console.log('New template was added', newData);
});
