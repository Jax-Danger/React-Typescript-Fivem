import React, { useState, useEffect } from "react";
import { debugData, fetchNui } from "../../utils/utils";
debugData([{ action: "setVisible", data: true }]);

/**This is the Home Page page.
 This is the first screen players see when they open the UI.*/
const HomePage: React.FC = () => {
	const [servername, setServerName] = useState<string>("Test Server");
	const [startingMoney, setStartingMoney] = useState<number>(1000);
	const [pvp, setPvp] = useState<string>("disabled");

	/*This fetches the server info from the server when the page is loaded.
		This happens only once due to the useEffect hook.	*/
	useEffect(() => {
		fetchNui("getServerInfo").then((data: any) => {
			setServerName(data.serverName);
			setStartingMoney(data.StartingMoney);
			setPvp(data.EnablePvP);
		});
	}, []);

	return (
		<>
			{/* Default Title */}
			<h1 className="select-none absolute top-2 left-[27.1%] text-3xl font-bold">
				React x Lua Boileplate for FiveM
			</h1>
			<h2 className="select-none absolute top-10 left-[37.1%] text-xl">
				Created by CodesAndGames
			</h2>

			<div className="absolute top-20 left-[35%] text-xl text-left">
				<p>Welcome to {servername}</p>
				<p>Your Starting money is ${startingMoney}</p>
				<p>PVP is currently {pvp}</p>
			</div>
		</>
	);
};

export default HomePage;
