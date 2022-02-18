const github = require('@actions/github');
const core = require('@actions/core');

async function run () {
    const octokit = github.getOctokit(process.env.INPUT_GITHUB_TOKEN)
    const repository = process.env.GITHUB_REPOSITORY;
    const repo = repository.split("/");
    await octokit.issues.createComment({
        owner: repo[0],
        repo: repo[1],
        issue_number: parseInt(core.getInput('issue-number'), 10),
        body: ':white_check_mark: Template has been verified',
    });
}
run();
