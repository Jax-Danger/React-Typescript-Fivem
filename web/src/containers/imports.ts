/*
 This is the file used to import everything that is needed for the app.
 This is used to make it easier to import everything needed.
*/
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Images from "./pages/Images";

export {
	// Dependencies for use Pages in React.
	Router,
	Routes,
	Route,
	useLocation,
	useNavigate,
	// Components for each of the pages.
	HomePage,
	Images,
};
