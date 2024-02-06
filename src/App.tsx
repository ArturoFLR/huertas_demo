import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WrongPath from "./pages/WrongPath";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PublicationPage from "./pages/PublicationPage";
import PublicationsPage from "./pages/PublicationsPage";


export function App() {

	return (
		<Routes>
			<Route path="*" element={<WrongPath />} />
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/publications" element={<PublicationsPage />} />
			<Route path="/publications/:id" element={<PublicationPage />} />
		</Routes>
	);
}

export default App;
