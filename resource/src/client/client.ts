import { send } from "./nui"

on("MP-React-TS:setVisible", (visible: boolean) => {
    send({
        action: "setVisible",
        data: visible
    })
})

RegisterCommand("setVisible", () => {
    emit("MP-React-TS:setVisible", true)
}, false)
