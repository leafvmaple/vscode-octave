# Octave Language README

The Visual Studio Code extenstion for Octave Language support.

## Release Notes

### Version 0.1.1

* Add snippets.

* Fixed the bug of run code.

### Version 0.1.0

* Support `Run Octave Code` in the vscode.

### Version 0.0.1

* Create the `tmLanguage`.

## Setup Guide

### Win10

* (have octave installed. For example, in "C:\Octave\Octave-5.2.0\"
* Install the extension to VSCode
* Add "C:\Octave\Octave-5.2.0\mingw64\bin" to your system's PATH environment variable.
* In '%USERPROFILE%\.vscode\extensions\leafvmaple.octave-0.1.1\out\commands.js' change 'this.COMMANDS = "octave "' to 'this.COMMANDS = "octave-cli "'. Note the trailing whitespace!
* Restart VSCode
* Button should work now :)

-----------------------------------------------------------------------------------------------------------