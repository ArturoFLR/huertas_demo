import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function registerUser (formData: FormData) {

	try{
		const response = await axiosConfig.post("/register", formData);
		const newUserToken = response.data;

		return newUserToken;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.response!.data);
		}
	}
}