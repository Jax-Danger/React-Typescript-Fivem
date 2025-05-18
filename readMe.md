## important
Use the following at the top of EVERY server or client file

if the file is for client, use:
`/// <reference types="@citizenfx/client" />`

if the file is for server, use:
`/// <reference types="@citizenfx/server" />`


This is important, because it allows the dev(you) to use fivem native functions for that file.
Note: You don't always have to use it, but if you have issues with native calls, then add it at the top.

## Commands
First thing to run is `npm i`. This installs all the packages via node(which is required) to actually allow you to code.

Use `npm run build` to build files in javascript.
use `npm run dev` to build files and obfuscate them for production.
use `npm run watch` to have files automatically built into javascript(not obfuscated)

## global values
All global variables, interfaces, and types are defined in the globals/global.d.ts file. By default it only has the config defined, but you can add more.
