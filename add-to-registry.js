const fs = require('fs');
const myArgs = process.argv.slice(2);
const body = myArgs[0];
const pluginName = extractTemplateNameFromIssue(body);
const registry = fs.readFileSync('registry.json');
const registryObject= JSON.parse(registry);

registryObject.push(pluginName);
const newData = JSON.stringify(registryObject);
fs.writeFile('registry.json', newData, err => {
    if(err) throw err;
    console.log('New template was added', newData);
});

/**
 * Extracting template name from the issue body.
 *
 * @param issueBody
 * @returns {string}
 */
function extractTemplateNameFromIssue(issueBody) {
    const matches = issueBody.split('\n')
        .map((line) => {
            const match = line ? line.match(/(https?:\/\/.[^ ]*)/gi) : null
            if (match) {
                return match.find((x) => x.includes('npmjs.com/package'));
            }
        })
        .filter((m) => m)
        .map((x) => {
            return x.split('/').splice(4).join('/').replace(/[^a-zA-Z0-9@\\/-]/g, '');
        });

    if (matches.length) {
        return matches[0];
    } else {
        throw new Error('Cannot determine template name.');
    }
}
