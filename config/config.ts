/*
* If you are familiar with Lua configs, you'll feel right at home with this.
* This idea is very similar to the way Lua configs work, but with TypeScript.
*/
const config: any = {}; export default config;
/*
* Please don't touch the above line, it is used to define the config object.
* Removing the above line will result in the config breaking the script.
*/

/*
* If you want to add more properties to the config, just follow the below example:
config.coords = [
  [ 123, 456, 789 ], // This would act as Vector3 coordinates, you can use this for blips, markers, etc.
  {something: 'I\'m in an object!'}, // This would act as an object, you can use this for anything you want.
  'I\'m just a string!', // This is just text.
  12345 + " is a number!" // this is a mix of text and a number using the + operator.
]

* Knock yourself out with configs. There is no limit so have fun.
*/



