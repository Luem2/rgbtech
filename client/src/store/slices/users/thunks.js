import axios from "axios";
import { setErrorLogin } from "../components/componentSlice";

export const AuthUserLogin = (user) => {
	return async (dispatch) => {
		try {
			const response = await axios.post("/users/login", user);
			console.log(response);
			const token = response.data.token;
			window.localStorage.setItem("token", token);
			setAuthToken(token);
		} catch (e) {
			console.log("estoy entrando al error de Auth");
			dispatch(setErrorLogin(true));
			console.error(e);
		}
	};
};

export const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

export const postUser = (userCreated) => {
	return async () => {
		try {
			await axios.post("users/register", userCreated);
		} catch (e) {
			console.error(e);
		}
	};
};

export const confirmationEmail = (payload) => {
	return async () => {
		try {
			await axios.post("users/confirmation", payload);
		} catch (error) {
			console.log(error);
		}
	};
};
