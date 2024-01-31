import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WrongPath from "./pages/WrongPath";
import { Register } from "./components/forms/Register";
import { Login } from "./components/forms/Login";


export function App() {

	return (
		<Routes>
			<Route path="*" element={<WrongPath />} />
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}

export default App;
