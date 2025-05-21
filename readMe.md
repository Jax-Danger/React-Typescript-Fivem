# intro

This is a monorepo, which essentially means that this is one big typescript project with multiple fivem resources created inside.

# setup

To get started, modify the build.config.json file to specify the output for the _developement_ builds of your resources. When you are ready to use the scripts in _production_ then manually move them out of the monorepo and into your resources folder.

If you never move the actual folders out of the monorepo for produciton, the resource _will not work_. This is due to the symlink that is created each time yarn build command is used.

## Getting started

After modifying the build.config.json file, open the vsc terminal via `CTRL + ~` and type `yarn`. This will install all packages required for coding fivem resources.

## commands

`yarn build` - builds all fivem resources.
`yarn build {folder}` - builds a specific resource by specifying the folder name
`yarn build --watch` - automatically builds the file that gets saved.
`yarn build --watch {folder}`- same as `yarn build {folder}` but for watching.
`yarn build --obfuscate` - uses javascript-obfuscator to compile and jumble up the built code to prevent leakers. Obfuscates all resources.
`yarn build --obfuscate {folder}` - builds and obfuscates a specifc resource.

## important

Below are reference types that should be placed in at least one file(depending on the resource side(client/server)) to ensure all natives are able to be used without issues.
For client side files only.
`/// <reference types="@citizenfx/client" />`
For server side files only.
`/// <reference types="@citizenfx/server" />`

and
`/// <reference types="../../global.d.ts" />`
in the shared files if you use interfaces.
