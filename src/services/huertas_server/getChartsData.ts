import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function getChartsData () {

	try{
		const response = await axiosConfig.get("/charts/all");
		const userData = response.data;

		return userData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}