import { UserRoleType } from "../../context/UserRoleContext";

// REGISTER

export type RegisterStateType = "init" | "loading" | "error" | "logged";

export type UserDataResponseType = {
	userName: string,
	userRole: UserRoleType
}

export type RegisterFormValuesType = {
	userName: string,
	userLastName: string,
	userEmail: string,
	userAddressStreet: string,
	userAddressCity: string,
	userAddressCountry: string,
	userPassword: string,
	userPasswordConfirm: string
}


// LOGIN

export type LoginStateType = "init" | "loading" | "error" | "logged";