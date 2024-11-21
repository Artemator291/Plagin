import * as vscode from 'vscode';
import * as path from 'path';

let startTime: Date | null = null;

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Привет! Добро пожаловать в проект!');

    startTime = new Date();

    setTheme();

    updateStatusBar(context);

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.stopTimeTracking', () => {
            stopTracking(context);
        })
    );

    setInterval(() => {
        setTheme();
    }, 60000);
}

function setTheme() {
    const hour = new Date().getHours();
    const config = vscode.workspace.getConfiguration('my-extension');

    let theme = '';
    if (hour >= 0 && hour < 8) {
        theme = config.get<string>('Default Dark+')!;
    } else if (hour >= 8 && hour < 17) {
        theme = config.get<string>('Default Light+')!;
    } else {
        theme = config.get<string>('Default Dark+')!;
    }

    const currentTheme = vscode.workspace.getConfiguration().get('workbench.colorTheme');
    if (currentTheme !== theme) {

        vscode.workspace.getConfiguration().update('workbench.colorTheme', theme, true);
    }
}

function updateStatusBar(context: vscode.ExtensionContext) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBarItem);

    setInterval(() => {
        const now = new Date();
        const elapsed = startTime ? Math.floor((now.getTime() - startTime.getTime()) / 1000) : 0;
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60; 
        statusBarItem.text = `⏳ ${hours}ч ${minutes}мин ${seconds}сек в проекте`;
        statusBarItem.show();
    }, 1000); 
}

function stopTracking(context: vscode.ExtensionContext) {
    if (!startTime) return;

    const elapsed = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);

    vscode.window.showInformationMessage(`Вы проработали ${hours}ч ${minutes}мин. До свидания!`);

    showGoodbyeGif(context);
}

function showGoodbyeGif(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        'goodbye',
        'До свидания!',
        vscode.ViewColumn.One,
        {}
    );

    const gifPath = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'media', 'goodbye.gif'))
    );

    panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>До свидания!</h1>
            <img src="${gifPath}" alt="Goodbye GIF" />
        </body>
        </html>
    `;
}
