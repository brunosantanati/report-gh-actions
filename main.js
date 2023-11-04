const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
    console.log('console.log test')
    core.notice('core.notice test')
}

run()