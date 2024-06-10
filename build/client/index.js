"use strict";

// resource/client/index.ts
var sendReactMessage = (action, data) => {
  SendNuiMessage(
    JSON.stringify({
      action,
      data
    })
  );
};
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
