import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
	Login,
	Home,
	Profile,
	Courses,
	Help,
	History,
	Report,
} from "./containers";
import { BrowserRouter } from "react-router-dom";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/history" element={<History />} />
					<Route path="/report" element={<Report />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/help" element={<Help />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
