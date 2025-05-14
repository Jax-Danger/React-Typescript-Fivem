// Add you config types here. If it's something like a table, just add any, 
// then write your stuff inside the table in the actual config file

interface configType {
	greeting?: string;
	maxPlayers?: number;
	JaxDanger?: any;
}

declare const config: configType;
