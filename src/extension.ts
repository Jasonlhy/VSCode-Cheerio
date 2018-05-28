'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-cheerio" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', async () => {
        // The code you place here will be executed every time your command is executed

        const cheerio = require('cheerio')
        // const $ = cheerio.load('<h2 class="title">Hello world</h2>')
        // $('h2.title').text('Hello there!');
        // $('h2').addClass('welcome');
        // console.log($('body').html())

        let editor = vscode.window.activeTextEditor;
        if (editor){
            if (editor.selection.isEmpty){
                vscode.window.showInformationMessage('Please make one selection');
                return;
            }

            let command = await vscode.window.showInputBox({
                placeHolder: "$('h2').addClass('welcome');",
                prompt: "Enter the usage of cheerio",
            }) || '';

            if (!command){
                vscode.window.showInformationMessage('Do not input empty');
                return;
            }

            let range = new vscode.Range(editor.selection.start, editor.selection.end)
            let data = editor.document.getText(range);

            // it auto wraps inside body in 1.0 version
            try {
                let $ = cheerio.load(data, {
                    xmlMode: true
                });
    
                // let command = "$('h2').addClass('welcome');"
                // let command = "$('h2').aaa('welcome');"
                eval(command);
                let result = $.html();
                console.log(result);
                await editor.edit(editorBuilder => {
                    editorBuilder.replace(range, result);
                });

            } catch (error) {
                console.error(error);
                vscode.window.showInformationMessage('cheerio error: ' + error.message);
            }
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}