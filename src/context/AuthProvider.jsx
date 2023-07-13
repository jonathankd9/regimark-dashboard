import React, {useState, createContext} from "react";

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

	return (
		<AuthContext.Provider
			value={{isAuth, setIsAuth, token, handleLogout, userData, setUserData}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
