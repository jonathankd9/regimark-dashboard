import React, {useState, useEffect, createContext} from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
	const [isAuth, setIsAuth] = useState(localStorage.token ? true : false);
	const token = localStorage.getItem("token");
	const [userData, setUserData] = useState({});

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");

		window.location.href = "";
	};

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Token ${token}`;
			setIsAuth(true);

			axios
				.post("https://jkd6735.pythonanywhere.com/api/auth/lecturer/login/")
				.then((response) => {
					setUserData(response.data);
				});
		}
	}, [token]);

	return (
		<AuthContext.Provider
			value={{isAuth, setIsAuth, token, handleLogout, userData, setUserData}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
