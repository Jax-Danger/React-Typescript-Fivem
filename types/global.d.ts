interface configType {
	ServerName: string;
	MaxPlayers: number;
	StartingMoney: number;
	isPvpEnabled: boolean;
}

declare const config: configType;
