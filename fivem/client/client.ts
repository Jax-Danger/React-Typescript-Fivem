/// <reference types="@citizenfx/client" />

onNet('client:event', () => {
	console.log('triggered client event from server. Now triggering server event.')
	emitNet('server:event')
})

function SendToUi(action: string, data: {}) {
	SendNUIMessage({
		action: action,
		data: data
	})
}
RegisterCommand('open', () => {
	SendToUi('open', config)
}, false)
