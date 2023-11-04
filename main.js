const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
    const apiUrl = core.getInput('apiUrl', { required: true })

    console.log(`apiUrl = ${apiUrl}`)
}

run()