import "./login.css";
import { useEffect, useRef, useState } from "react";
import { logInUser } from "../../services/huertas_server/logInUser";
import { user } from "../../data/userData";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { useNavigate } from "react-router-dom";
import { LoginStateType, UserDataResponseType } from "./formsTypes";



export default function Login() {
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
		<div className="w-[300px] h-[450px] bg-huerta flex items-center justify-center rounded-2xl text-[#eaefd4f2]">
			<form name="login" id="login" encType="multipart/form-data" ref={loginForm} className="w-[250px] h-[330px] border-solid text-center bg-[#86b155d6] p-4 rounded-2xl">
				<div className="flex justify-center items-center gap-4 bg-[#6ea82ce9] rounded-2xl">
					<img src="./public/images/huertas-logo.png" alt="logo"
						className="w-[35px] h-[35px] rounded-full border-solid border-2 border-[#78b632] ml-[-30px]" />
					<h2 className="">Ingresar</h2>
				</div>

				<div className="flex flex-col justify-center items-center p-[1rem_0]">
					<label htmlFor="loginEmail">Email</label>
					<input type="email" id="loginEmail" name="userEmail" required
						className="bg-[#94ff1b52] outline-none  border-b-[1px] border-b-[#60e848ca] mb-6 rounded-2xl p-[0_12px]"
					></input>

					<label htmlFor="loginPassword">Contraseña </label>
					<input type="password" id="loginPassword" name="userPassword" required className="bg-[#94ff1b52] outline-none  border-b-[1px] border-b-[#60e848ca] rounded-2xl p-[0_12px]"></input>
				</div>

				{
					loginState === "error" && <p className=" text-red-500 p-2">Email / Clave Incorrectos</p>
				}

				{loginState === "loading" && (
					<div className="flex items-center justify-center translate-y-[-10px]">
						<img alt="Cargando..." src="icons/loading.gif" className="w-[45px] h-[45px] rounded-full"/>
					</div>
				)}

				<button type="submit" className="bg-[#62a614f5] p-[.5rem_2rem] rounded-2xl m-[1.5rem_0_0]">Login</button>
			</form>
		</div>
	);
}
