import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WrongPath from "./pages/WrongPath";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";


export function App() {

	return (
		<Routes>
			<Route path="*" element={<WrongPath />} />
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
}

export default App;
