export class NUI {
	private static registered: string[] = [];

	// Makes registering NUI Callbacks in TS much easier
	static register<T = any, R = any>(eventName: string, handler: NuiCallbackHandler<T, R>) {
		RegisterNuiCallbackType(eventName) // register the type
		on(`__cfx_nui:${eventName}`, (data: T, cb: (res: R) => void) => {
			handler(data, cb);
		});
		this.registered.push(eventName);
	}

	// Lists all registered callbacks for debugging.
	static list(): string[] {
		return [...this.registered];
	}

	// Sends information to UI easier.
	static send(action: string, data: {}) {
		SendNUIMessage({
			action: action,
			data: data
		})
	}
}


// CALLBACKS

NUI.register('closeBox', (data, cb) => {
	console.log("Closed box");
	cb({})
})