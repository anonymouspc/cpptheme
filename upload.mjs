import fs from "fs";
import child_process from "child_process"
import util from "util"
child_process.exec = util.promisify(child_process.exec)



// Update files
try {
    let response = await fetch("https://raw.githubusercontent.com/microsoft/vscode/refs/heads/main/src/vs/base/browser/ui/codicons/codicon/codicon.ttf")
    let bytes = await response.bytes()
    await fs.promises.writeFile("icon/codicon.ttf", bytes);
} catch (error) {
    console.warn("warning: fetch failed (with file = codicon.ttf)")
}
try {
    let response = await fetch("https://raw.githubusercontent.com/microsoft/vscode-loc/refs/heads/main/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json")
    let text = await response.text()
    let json = JSON.parse(text)
    json["contents"]["vs/editor/contrib/gotoSymbol/browser/goToCommands"]["actions.goToDecl.label"] = "hahaha!"
    text=  JSON.stringify(json)
    await fs.promises.writeFile("locale/cpp-zh-cn.json", text)
} catch (error) {
    console.warn("warning: fetch failed (with file = cpp-zh-cn.json)")
}

await child_process.exec("git pull")
try {
    await child_process.exec("git add .")
    await child_process.exec("git commit -m update")
} catch (_) { }
await child_process.exec(`vsce publish patch --pat ${await fs.readFile("vsce-token.txt")}`)
await child_process.exec("git push")