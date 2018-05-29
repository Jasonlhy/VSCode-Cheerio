'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-cheerio" is now active!');
    
    let disposable = vscode.commands.registerCommand('extension.cheerioEvalCommand', async () => {
        const cheerio = require('cheerio')

        let editor = vscode.window.activeTextEditor;
        if (editor){
            if (editor.selection.isEmpty){
                vscode.window.showInformationMessage('Please make one selection');
                return;
            }

            let command = await vscode.window.showInputBox({
                placeHolder: "$('h2').addClass('welcome');",
                prompt: "Enter the API command of cheerio",
            }) || '';

            if (!command){
                vscode.window.showInformationMessage('Do not input empty command');
                return;
            }

            let range = new vscode.Range(editor.selection.start, editor.selection.end)
            let data = editor.document.getText(range);

            // it auto wraps inside body in 1.0 version
            try {
                let $ = cheerio.load(data);
                eval(command);
                let result = $('body').html();
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
