import React, { useState, createContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(localStorage.token ? true : false);
	const token = localStorage.getItem(token, "token");

	const handleLogout = () => {
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={(isAuth, setIsAuth, token, handleLogout)}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
