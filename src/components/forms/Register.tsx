import styles from "./Register.module.scss";
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
		userName: Yup.string().required("Debes completar este campo"),
		userLastName: Yup.string().required("Debes completar este campo"),
		userEmail: Yup.string().email("El formato no coincide con un email").required("Debes completar este campo"),
		userAddressStreet: Yup.string().required("Debes completar este campo"),
		userAddressCity: Yup.string().required("Debes completar este campo"),
		userAddressCountry: Yup.string().required("Debes completar este campo"),

		userPassword: Yup.string()
			.required("Debes completar este campo")
			.min(8, "Al menos 8 caracteres")
			.max(12, "Máximo 12 caracteres")
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
	});

	return (
		<>
			{
				registerState === "init" && (
					<div className={styles.mainContainer}>

						<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={submitForm}>
							<Form name="registerForm" action="" encType="multipart/form-data" className={styles.formLabel}>

								<div className={styles.formImageAndInputsContainer}>
									<img src="./images/huertas-login.jpg" alt="ecohuertas" className={styles.formMainImage} />

									<h2 className={styles.formTitle}>Regístrate</h2>

									<div className={styles.formFieldsContainer}>
										<div className={styles.fieldContainer}>
											<label htmlFor="userName">Nombre: </label>
											<Field type="text" id="userName" name="userName" />
										</div>

										<ErrorMessage name="userName" >
											{errorMsg => <p className={styles.validationErrorMsg}>{errorMsg}</p>}
										</ErrorMessage>


										<div className={styles.fieldContainer}>
											<label htmlFor="userLastName">Apellidos: </label>
											<Field type="text" id="userLastName" name="userLastName" />
										</div>

										<ErrorMessage name="userLastName" >
											{errorMsg => <p className={styles.validationErrorMsg}>{errorMsg}</p>}
										</ErrorMessage>

										<div className={styles.fieldContainer}>
											<label htmlFor="userEmail">Email: </label>
											<Field type="email" id="userEmail" name="userEmail" />
										</div>

										<ErrorMessage name="userEmail" >
											{errorMsg => <p className={styles.validationErrorMsg}>{errorMsg}</p>}
										</ErrorMessage>

										<div className={styles.fieldContainer}>
											<label htmlFor="userAddressStreet">Calle / Vía: </label>
											<Field type="text" id="userAddressStreet" name="userAddressStreet" />
										</div>

										<ErrorMessage name="userAddressStreet" >
											{errorMsg => <p className={styles.validationErrorMsg}>{errorMsg}</p>}
										</ErrorMessage>

										<div className={styles.fieldContainer}>
											<label htmlFor="userAddressCity">Localidad: </label>
											<Field type="text" id="userAddressCity" name="userAddressCity" />
										</div>

										<ErrorMessage name="userAddressCity" >
											{errorMsg => <p className={styles.errorMsg}>{errorMsg}</p>}
										</ErrorMessage>

										<div className={styles.fieldContainer}>
											<label htmlFor="userAddressCountry">País: </label>
											<Field type="text" id="userAddressCountry" name="userAddressCountry" />
										</div>

										<ErrorMessage name="userAddressCountry" >
											{errorMsg => <p className={styles.validationErrorMsg}>{errorMsg}</p>}
										</ErrorMessage>

										<div className={styles.fieldContainer}>
											<label htmlFor="userPassword">Contraseña: </label>
											<Field type="password" id="userPassword" name="userPassword" />
										</div>

										<ErrorMessage name="userPassword" >
											{errorMsg => <p className={styles.validationErrorMsg}>{errorMsg}</p>}
										</ErrorMessage>

										<div className={styles.fieldContainer}>
											<label htmlFor="userPasswordConfirm">Confirmar: </label>
											<Field type="password" id="userPasswordConfirm" name="userPasswordConfirm" />
										</div>

										<ErrorMessage name="userPasswordConfirm" >
											{errorMsg => <p className={styles.validationErrorMsg}>{errorMsg}</p>}
										</ErrorMessage>
									</div>

									<button type="submit" className={styles.btnSubmit}>Enviar</button>

								</div>
							</Form>
						</Formik>

					</div>
				)
			}

			{registerState === "loading" && (
				<div className={styles.loadingAndErrorContainer}>
					<div className={styles.loadingIconContainer}>
						<img alt="Cargando..." src="icons/loading.gif" className={styles.loadingIcon} />
					</div>
				</div>
			)}

			{registerState === "error" && (
				<div className={styles.loadingAndErrorContainer}>
					<h1 className={styles.serverErrorMessage}>Ups! Ha habido algún problema al intentar hacer el registro: <span>{errorMessage.current}</span> Por favor, revisa tu conexión e inténtalo de nuevo.</h1>
				</div>
			)}
		</>
	);
}