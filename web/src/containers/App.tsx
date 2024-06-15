import React from "react";
import { debugData } from "../utils/debugData";
import Home from "./Home";

debugData([
	{
		action: "setVisible",
		data: true,
	},
]);

const App: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Home />
		</div>
	);
};

export default App;
