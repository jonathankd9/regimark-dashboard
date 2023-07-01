import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "vuesax/dist/vuesax.css";
import "./index.css";
import AuthContext from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContext.Provider>
			<App />
		</AuthContext.Provider>
	</React.StrictMode>
);
