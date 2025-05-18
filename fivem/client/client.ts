/// <reference types="@citizenfx/client" />

import { NUI } from "./util/utilities"

onNet('client:event', () => {
	console.log('triggered client event from server. Now triggering server event.')
	emitNet('server:event')
})

RegisterCommand('open', (source: number) => {
	NUI.send('open', config)

	console.log(config);
	SetNuiFocus(true, true)
}, false)
