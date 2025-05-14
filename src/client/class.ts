class MyHelper {
	static greet(name: string) {
		console.log(`[Helper] Hello, ${name}`);
	}
}

// @ts-ignore
globalThis.MyHelper = MyHelper;