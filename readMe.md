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
If you ever use global or globalThis for things like configs, make sure to define it at the top of your file with `//@ts-ignore` above it.
This will remove any errors you may have. Ts is weird like that.
You can also use type checking for your config in the configEditor's config.d.ts file. 