"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// resource/client/index.ts
var sendReactMessage = /* @__PURE__ */ __name((action, data) => {
  SendNuiMessage(
    JSON.stringify({
      action,
      data
    })
  );
}, "sendReactMessage");
RegisterCommand("setVisible", () => {
  SetNuiFocus(true, true);
  sendReactMessage("setVisible", true);
}, false);
RegisterNuiCallbackType("hideFrame");
on("__cfx_nui:hideFrame", function(_, cb) {
  SetNuiFocus(false, false);
  sendReactMessage("setVisible", false);
  cb({});
});
console.log("hello from client!");
