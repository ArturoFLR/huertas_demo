import styles from "./Login.module.scss";
import { useEffect, useRef, useState } from "react";
import { logInUser } from "../services/huertas_server/logInUser";
import { user } from "../data/userData";
import { UserRoleType, useUserRoleContext } from "../context/UserRoleContext";
import { useNavigate } from "react-router-dom";


type LoginStateType = "init" | "loading" | "error" | "logged";
type UserDataResponseType = {
	userName: string,
	userRole: UserRoleType
}


function Login() {
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
		<div className={styles.formMainContainer}>
			{
				loginState === "init" || loginState === "error"
					? (
						<form name="login" id="login" encType="application/x-www-form-urlencoded" ref={loginForm} className={styles.formLabel}>
							<label htmlFor="loginEmail" className={styles.labelLabel} >Email</label>
							<input type="email" id="loginEmail" name="userEmail" required className={styles.inputLabel}></input>

							<label htmlFor="loginPassword" className={styles.labelLabel}>Contraseña </label>
							<input type="password" id="loginPassword" name="userPassword" required className={styles.inputLabel}></input>

							<button type="submit" className={styles.btnLogIn} >Logarme</button>

							{loginState === "error" && <p className={styles.textError} >Email / contraseña incorrectos</p>}
						</form>
					)
					: <p className={styles.textLoading}>Loading...</p>
			}
		</div>
	);
}

export default Login;
