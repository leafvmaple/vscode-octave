"use strict";
import * as vscode from "vscode";
import { Commands } from "./commands";

const commands = new Commands();

export function activate(context: vscode.ExtensionContext) {

    const run = vscode.commands.registerCommand("octave.run", (fileUri: vscode.Uri) => {
        commands.executeCommand(fileUri);
    });

    const stop = vscode.commands.registerCommand("octave.stop", () => {
        commands.stopCommand();
    });

    context.subscriptions.push(run);
    context.subscriptions.push(commands);
}

export function deactivate() {
    commands.stopCommand();
}
