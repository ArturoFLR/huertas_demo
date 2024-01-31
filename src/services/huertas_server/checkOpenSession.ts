import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function checkOpenSession () {

	try{
		const response = await axiosConfig.get("/userSession");
		const userData = response.data;

		return userData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.response!.data);
		}
	}
}