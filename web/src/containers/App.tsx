import React from "react";
import { debugData } from "../utils/debugData";
import { useNavigationState } from "../atoms/navigationAtom";
import Home from "./Home";

// This will set the NUI to visible if we are
// developing in browser
debugData([
	{
		action: "setVisible",
		data: true,
	},
]);

const App: React.FC = () => {
	const [navigationState, setNavigationState] = useNavigationState();

	const renderPage = React.useCallback(() => {
		switch (navigationState.path) {
		default:
			return <Home />;
		}
	}, [navigationState]);

	return <div className="flex flex-col min-h-screen">{renderPage()}</div>;
};

export default App;
