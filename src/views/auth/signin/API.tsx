import axios from "axios";
import { API_URL } from "config/constant";

interface functionParams {
    url: string;
    method: string;
    data?: any;
    token?: string;
}

export const apiCall = async ({ url, method, data, token }: functionParams) => {
    try {
        const headers = token ? { Authorization: `Token ${token}` } : {};
        const response = await axios({
            url: `${API_URL}${url}`,
            method,
            data,
            headers: headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}