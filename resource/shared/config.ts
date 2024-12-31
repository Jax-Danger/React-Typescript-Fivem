const configPath = "config.json";
const data = LoadResourceFile(GetCurrentResourceName(), configPath);
if (!data || null) {
  console.error('Something is wrong. Config isn\'t detected.');
}
let config: Config;
config = JSON.parse(data);

export default config;

// Interfaces for type safety
interface Config {
  string: string;
  number: number;
  boolean: boolean;
  array: number[];
  object: {
    something: string;
  }
}
