import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function logOutUser () {

	try{
		await axiosConfig.get("/logout");
		
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}