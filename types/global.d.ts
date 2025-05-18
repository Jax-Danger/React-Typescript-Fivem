interface configType {
	ServerName: string;
	MaxPlayers: number;
	StartingMoney: number;
	isPvpEnabled: boolean;
}

declare const config: configType;

type NuiCallbackHandler<T = any, R = any> = (data: T, cb: (res: R) => void) => void;

interface NUIMessage {
	action: string;
	data: {};
}
