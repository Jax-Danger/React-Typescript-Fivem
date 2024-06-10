/**
 * Sends a message to the UI in React.js
 * @param {string} action
 * @param {object | boolean | string | number} data
 */
const sendReactMessage = (action: string, data: unknown) => {
    SendNuiMessage(
        JSON.stringify({
            action: action,
            data: data,
        })
    );
};

// Register Command exemple
RegisterCommand("setVisible", () => {
    SetNuiFocus(true, true);
    sendReactMessage("setVisible", true);
}, false);

// NUI Call Example
RegisterNuiCallbackType("hideFrame");

on("__cfx_nui:hideFrame", function (_: unknown, cb: Function) {
    SetNuiFocus(false, false);
    sendReactMessage("setVisible", false);
    cb({});
});
