
interface NuiMessagePayload {
  action: string;
  data: any;
}

// Function to send NUI messages
const sendReactMessage = (action: string, data: any) => {
  SendNuiMessage(JSON.stringify({ action, data } as NuiMessagePayload));
};

// Register a command to set visibility and send NUI message
RegisterCommand("setVisible", () => {
  SetNuiFocus(true, true); // Assuming SetNuiFocus is defined elsewhere
  sendReactMessage("setVisible", true);
}, false);

// Register a NUI callback to handle 'hideFrame' event
RegisterNuiCallbackType("hideFrame");
on("__cfx_nui:hideFrame", (_: any, cb: any) => {
  SetNuiFocus(false, false); // Assuming SetNuiFocus is defined elsewhere
  sendReactMessage("setVisible", false);
  cb({}); // Callback with an empty object
});

