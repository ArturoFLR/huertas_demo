import "./login.css";
import { useEffect, useRef, useState } from "react";
import { logInUser } from "../../services/huertas_server/logInUser";
import { user } from "../../data/userData";
import { UserRoleType, useUserRoleContext } from "../../context/UserRoleContext";
import { useNavigate } from "react-router-dom";



type LoginStateType = "init" | "loading" | "error" | "logged";
//Tipos de datos aceptados en el LoginState y en userDataResponse -- Necesario por TS
type UserDataResponseType = {
	userName: string,
	userRole: UserRoleType
}


export function Login() {
	const { setUserRole } = useUserRoleContext();
	const [loginState, setLoginState] = useState<LoginStateType>("init");

	const loginForm = useRef<HTMLFormElement>(null);
	const navigate = useNavigate();


	function sendForm(e: Event) {
		e.preventDefault();

		setLoginState("loading");

		const formData = new FormData((loginForm.current as HTMLFormElement));
		logInUser(formData)
			.then((UserDataResponse: UserDataResponseType) => {
				user.name = UserDataResponse.userName;
				setUserRole(UserDataResponse.userRole);
				setLoginState("logged");
			})
			.catch(() => {
				setLoginState("error");
			});
	}

	useEffect(() => {

		if (loginState === "logged") {
			console.log(loginState);
			navigate("/");
		}

		if (loginForm.current) {
			(loginForm.current as HTMLFormElement).addEventListener("submit", sendForm);
		}


		return () => {

			// Eliminate the event listener for the form submit. 
			if (loginForm.current) {
				(loginForm.current as HTMLFormElement).removeEventListener("submit", sendForm);
			}
		};

	}, [loginState]);

	return (
		<div className="container">
			<form name="login" id="login" encType="application/x-www-form-urlencoded" ref={loginForm} className="form">
				<h2 className="form-title">Ingresar</h2>

				<div className="form-inputs">
					<label htmlFor="loginEmail">Email</label>
					<input type="email" id="loginEmail" name="userEmail" required></input>

					<label htmlFor="loginPassword">Contraseña </label>
					<input type="password" id="loginPassword" name="userPassword" required></input>
				</div>

				<button type="submit" className="sendBtn">Login</button>
			</form>
		</div>
	);
}
