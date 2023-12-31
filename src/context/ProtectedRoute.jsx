import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

export const ProtectedRoute = ({ children }) => {
	const { isAuth } = useContext(AuthContext);
	if (!isAuth) {
		return <Navigate to="/" />;
	}
	return children;
};
