import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WrongPath from "./pages/WrongPath";
import Login from "./components/forms/Login";
import RegisterPage from "./pages/RegisterPage";


export function App() {

	return (
		<Routes>
			<Route path="*" element={<WrongPath />} />
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
}

export default App;
