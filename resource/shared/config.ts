import json5 from "json5";
const configPath = "config.jsonc";
const data = LoadResourceFile(GetCurrentResourceName(), configPath);
if (!data || null) {
  console.error('Something is wrong. Config isn\'t detected.');
}
let config: Config;
config = json5.parse(data);

export default config;

// Interfaces for type safety
interface Config {
  respawnCoords: number[];
}
