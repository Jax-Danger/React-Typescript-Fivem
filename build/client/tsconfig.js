// resource/client/tsconfig.json
var compilerOptions = {
  target: "ES2020",
  strict: true,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  resolveJsonModule: true,
  module: "CommonJS",
  types: ["@citizenfx/client", "@types/node"],
  lib: ["ES2020"]
};
var include = ["./**/*"];
var exclude = ["**/node_modules", "**/__tests__/*"];
var tsconfig_default = {
  compilerOptions,
  include,
  exclude
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compilerOptions,
  exclude,
  include
});
