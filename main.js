const core = require('@actions/core')
//const github = require('@actions/github')
//const exec = require('@actions/exec')
const https = require('https')
const { writeToPath } = require('@fast-csv/format')
const artifact = require('@actions/artifact');

function run() {
    const apiUrl = core.getInput('apiUrl', { required: true })

    https.get(apiUrl + '/products', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let products = JSON.parse(data)
            generateCsvReport(products)
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message)
    })
}

function generateCsvReport(products) {
    const path = 'products.csv';
    data = products
    const options = { headers: true, quoteColumns: true }

    writeToPath(path, data, options)
        .on('error', err => console.error(err))
        .on('finish', () => {
            console.log('CSV Report is ready!')
            uploadArtifact()
        })
}

function uploadArtifact() {
    const artifactClient = artifact.create()
    const artifactName = 'report-artifact';
    const files = [
        'products.csv'
    ]
    
    const rootDirectory = '.' // Also possible to use __dirname
    const options = {
        continueOnError: false
    }
    
    const uploadResponse = await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options)

    console.log(uploadResponse)
}

run()