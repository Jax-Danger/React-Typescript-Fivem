"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // client/util/utilities.ts
  var NUI;
  var init_utilities = __esm({
    "client/util/utilities.ts"() {
      "use strict";
      NUI = class {
        // Makes registering NUI Callbacks in TS much easier
        static register(eventName, handler) {
          RegisterNuiCallbackType(eventName);
          on(`__cfx_nui:${eventName}`, (data, cb) => {
            handler(data, cb);
          });
          this.registered.push(eventName);
        }
        // Lists all registered callbacks for debugging.
        static list() {
          return [...this.registered];
        }
        // Sends information to UI easier.
        static send(action, data) {
          SendNUIMessage({
            action,
            data
          });
        }
      };
      NUI.registered = [];
      NUI.register("closeBox", (data, cb) => {
        console.log("Closed box");
        cb({});
      });
    }
  });

  // client/client.ts
  var require_client = __commonJS({
    "client/client.ts"() {
      "use strict";
      init_utilities();
      onNet("client:event", () => {
        console.log("triggered client event from server. Now triggering server event.");
        emitNet("server:event");
      });
      RegisterCommand("open", (source) => {
        NUI.send("open", config);
        console.log(config);
        SetNuiFocus(true, true);
      }, false);
    }
  });

  // client/main.ts
  var require_main = __commonJS({
    "client/main.ts"() {
      var import_client = __toESM(require_client());
      init_utilities();
    }
  });
  require_main();
})();
