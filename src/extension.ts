"use strict";
import * as vscode from "vscode";
import { Commands } from "./commands";


export function activate(context: vscode.ExtensionContext) {
    
    const commands = new Commands();

    const run = vscode.commands.registerCommand("octave.run", (fileUri: vscode.Uri) => {
        commands.executeCommand();
    });

    const stop = vscode.commands.registerCommand("octave.stop", () => {
        commands.stop();
    });

    context.subscriptions.push(run);
    context.subscriptions.push(commands);
}

export function deactivate() {
}