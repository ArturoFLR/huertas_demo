import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function logInUser (formData: FormData) {

	try{
		const response = await axiosConfig.post("/login", formData);
		const userData = response.data;

		return userData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}