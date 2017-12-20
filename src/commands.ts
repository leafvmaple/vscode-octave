"use strict";
import * as vscode from "vscode";
import { basename, dirname } from "path";
import { print } from "util";

export class Commands implements vscode.Disposable {
    private _EXTENSION_NAME = "leafvmaple.nand2tetris";
    private _LANGUAGE_NAME  = "Octave";
    private _COMMANDS = "octave ";
    
    private _outputChannel: vscode.OutputChannel;
    private _terminal: vscode.Terminal;
    private _config: vscode.WorkspaceConfiguration;
    private _cwd: String;

    private _isRunning: boolean;
    private _process;

    constructor() {
        this._outputChannel = vscode.window.createOutputChannel(this._LANGUAGE_NAME);
        this._terminal = vscode.window.createTerminal(this._LANGUAGE_NAME);
    }

    public executeCommand(): void {
        if (this._isRunning) {
            vscode.window.showInformationMessage("Code is already running!");
            return;
        }

        const editor = vscode.window.activeTextEditor;
        const fileName = editor.document.fileName;
        this._cwd = dirname(editor.document.fileName);

        this._config = vscode.workspace.getConfiguration("octave");
        if (this._config.get<boolean>("runInTerminal")) {
            this.executeCommandInTerminal(fileName);
        } else {
            this.executeCommandInOutputChannel(fileName);
        }
    }

    public executeCommandInTerminal(fileName: string): void {
        if (this._config.get<boolean>("clearPreviousOutput")) {
            vscode.commands.executeCommand("workbench.action.terminal.clear");
        }
        this._terminal.show(this._config.get<boolean>("preserveFocus"));
        this._terminal.sendText(`cd "${this._cwd}"`);
        this._terminal.sendText(this._COMMANDS + fileName);
        
    }

    public executeCommandInOutputChannel(fileName: string): void {
        if (this._config.get<boolean>("clearPreviousOutput")) {
            this._outputChannel.clear();
        }
        this._isRunning = true;
        this._outputChannel.show(this._config.get<boolean>("preserveFocus"));
        this._outputChannel.appendLine(`[Running] ${basename(fileName)}`);
        const exec = require("child_process").exec;
        const startTime = new Date();
        this._process = exec(this._COMMANDS + fileName, { cwd: this._cwd });

        this._process.stdout.on("data", (data) => {
            this._outputChannel.append(data);
        });

        this._process.stderr.on("data", (data) => {
            this._outputChannel.append(data);
        });

        this._process.on("close", (code) => {
            this._isRunning = false;
            const endTime = new Date();
            const elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
            this._outputChannel.appendLine(`[Done] exit with code=${code} in ${elapsedTime} seconds`);
            this._outputChannel.appendLine("");
        });
    }

    public stop() {
        if (this._isRunning) {
            this._isRunning = false;
            const kill = require("tree-kill");
            kill(this._process.pid);
        }
    }

    public dispose() {

    }
}