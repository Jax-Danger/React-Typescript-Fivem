/// <reference types="@citizenfx/server" />
//@ts-ignore
const shared = globalThis.shared;

RegisterCommand('test', (source: number) => {
	const src = source;

	emitNet('client:event', src)
}, false)

onNet('server:event', () => {
	console.log('server:event called from client')
	const coords = shared.shared2['test'].coords
	console.log(coords)
})