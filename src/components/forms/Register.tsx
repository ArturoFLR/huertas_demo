// import styles from "./Register.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import *  as  Yup from "yup";
import { registerUser } from "../../services/huertas_server/registerUser";
import { user } from "../../data/userData";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterFormValuesType, RegisterStateType, UserDataResponseType } from "./formsTypes";



export default function Register() {
	const { setUserRole } = useUserRoleContext();
	const [registerState, setRegisterState] = useState<RegisterStateType>("init");
	const navigate = useNavigate();

	const errorMessage = useRef("");

	const lowerCaseRegex = /[a-z]/g;
	const upperCaseRegex = /[A-Z]/g;
	const numberRegex = /[0-9]/g;
	const specialCharacterRegex = /[!@#$%^&_*-]/g;

	const initialValues = {
		userName: "",
		userLastName: "",
		userEmail: "",
		userAddressStreet: "",
		userAddressCity: "",
		userAddressCountry: "",
		userPassword: "",
		userPasswordConfirm: ""
	};

	const registerSchema = Yup.object({
		userName: Yup.string().required("Debes completar este campo").max(30, "Máximo 30 caracteres"),
		userLastName: Yup.string().required("Debes completar este campo").max(30, "Máximo 30 caracteres"),
		userEmail: Yup.string().required("Debes completar este campo").email("El formato no coincide con un email").max(30, "Máximo 30 caracteres"),
		userAddressStreet: Yup.string().required("Debes completar este campo"),
		userAddressCity: Yup.string().required("Debes completar este campo"),
		userAddressCountry: Yup.string().required("Debes completar este campo"),

		userPassword: Yup.string()
			.required("Debes completar este campo")
			.min(8, "Al menos 8 caracteres")
			.max(15, "Máximo 12 caracteres")
			.matches(lowerCaseRegex, "Debe tener al menos una letra minúscula")
			.matches(upperCaseRegex, "Debe tener al menos una letra mayúscula")
			.matches(numberRegex, "Debe tener al menos un número")
			.matches(specialCharacterRegex, "Debe tener al menos una carácter especial"),

		userPasswordConfirm: Yup.string()
			.required("Debes confirmar tu contraseña")
			.oneOf([Yup.ref("userPassword")], "Las contraseñas no coinciden")
	});

	const submitForm = (formValues: RegisterFormValuesType) => {
		const formData = new FormData();
		const formValuesArray = Object.keys(formValues);							// Dado que en este caso no tenemos un formulario HTML que asignar directamente a FormData habría que añadir uno a uno los campos al FormData con "append(key, value)". Para automatizarlo obtenemos un array con todas las keys del objeto "formValues" e iteramos con un .map()

		formValuesArray.map((value) => {
			if (value !== "userPasswordConfirm") {
				formData.append(value, formValues[value as keyof typeof formValues]);
			}
		});


		setRegisterState("loading");

		registerUser(formData)
			.then((UserDataResponse: UserDataResponseType) => {
				user.name = UserDataResponse.userName;
				setUserRole(UserDataResponse.userRole);
				setRegisterState("logged");
			})
			.catch((err: Error) => {
				console.log(err);
				errorMessage.current = err.message;
				setRegisterState("error");
			});
	};

	useEffect(() => {
		let loggedTimeout: number;

		if (registerState === "error") {
			loggedTimeout = window.setTimeout(() => {
				setRegisterState("init");
			}, 4000);
		}

		if (registerState === "logged") {
			navigate("/");
		}

		return () => {
			clearTimeout(loggedTimeout);
		};
	}, []);

	return (
		<>
			{
				registerState === "init" && (
					<div className="flex justify-center items-center bg-huerta rounded-2xl p-6 w-[max-content] h-[max-content]">

						<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={submitForm}>
							<Form name="registerForm" action="" encType="multipart/form-data" className="w-[350px] h-[max-content] text-center bg-[#86b155d6] p-4 rounded-2xl text-[#eaefd4f2] overflow-hidden">

								<div className="flex flex-col gap-6 pb-2">
									<div className="flex justify-center items-center">
										<img src="./images/huertas-logo.png" alt="ecohuertas" className="w-[70px] h-[70px] rounded-full shadow-[0_0_12px] shadow-[#7edb15d6]" />

										<h2 className=" text-3xl font-light p-[0_2rem]">Regístrate</h2>
									</div>

									<div className="flex flex-col gap-1 items-start text-base">
										<div className="">
											<label htmlFor="userName">Nombre: </label>
											<Field type="text" id="userName" name="userName" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userName" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>


										<div className="">
											<label htmlFor="userLastName">Apellidos: </label>
											<Field type="text" id="userLastName" name="userLastName" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userLastName" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>

										<div className="">
											<label htmlFor="userEmail">Email: </label>
											<Field type="email" id="userEmail" name="userEmail" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userEmail" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>

										<div className="">
											<label htmlFor="userAddressStreet">Calle / Vía: </label>
											<Field type="text" id="userAddressStreet" name="userAddressStreet" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userAddressStreet" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>

										<div className="">
											<label htmlFor="userAddressCity">Localidad: </label>
											<Field type="text" id="userAddressCity" name="userAddressCity" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userAddressCity" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>

										<div className="">
											<label htmlFor="userAddressCountry">País: </label>
											<Field type="text" id="userAddressCountry" name="userAddressCountry" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userAddressCountry" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>

										<div className="">
											<label htmlFor="userPassword">Contraseña: </label>
											<Field type="password" id="userPassword" name="userPassword" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userPassword" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>

										<div className="">
											<label htmlFor="userPasswordConfirm">Confirmar: </label>
											<Field type="password" id="userPasswordConfirm" name="userPasswordConfirm" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
										</div>

										<ErrorMessage name="userPasswordConfirm" >
											{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
										</ErrorMessage>
									</div>

									<button type="submit" className="bg-[#62a614f5] border-[#88ff00f5] p-[.5rem_2rem] rounded-2xl m-[.5rem_0_0] hover:bg-[transparent]  hover:border-2 hover:text-[#d5f4b2f5] ease-in transition-all">Enviar</button>

								</div>
							</Form>
						</Formik>

					</div>
				)
			}

			{registerState === "loading" && (
				<div className="">
					<div className="">
						<img alt="Cargando..." src="icons/loading.gif" className="" />
					</div>
				</div>
			)}

			{registerState === "error" && (
				<div className="">
					<h1 className="">Ups! Ha habido algún problema al intentar hacer el registro: <span>{errorMessage.current}</span> Por favor, revisa tu conexión e inténtalo de nuevo.</h1>
				</div>
			)}
		</>
	);
}