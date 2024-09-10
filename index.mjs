import { Octokit, App } from "octokit";
import { readFileSync } from 'fs'

const privateKey = readFileSync("/Users/tony.wang/Documents/projects/playaround/vtx-platform-cd/cpe-auto-pr-poc/tony-auto-pr-manager.2024-09-09.private-key.pem",{encoding:"ascii"})

const app = new App({
  appId: 993026,
  privateKey
})

async function main() {
  const octokit = (await app.getInstallationOctokit(54690019)).rest

  const ORGANIZATION = `mah-jong`
  const REPO = `target`
  const PATH = "a.md"

  const content = await octokit.repos.getContent({
    owner:ORGANIZATION,
    repo:REPO,
    path:PATH
  })

  
  const result = await octokit.repos.createOrUpdateFileContents({
    content:Buffer.from("aaa123").toString("base64"),
    message:"update release",
    owner:ORGANIZATION,
    repo:REPO,
    path:"a.md",
    sha:content.data.sha
  })
  
  console.log(result);

}


main()
