import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

// Loading
import {Dots} from "react-activity";
import {Sentry} from "react-activity";
import {Spinner} from "react-activity";
import "react-activity/dist/library.css";

const Login = () => {
	const [staffId, setStaffId] = useState("");
	const [password, setPassword] = useState("");
	const {setIsAuth, setUserData} = useContext(AuthContext);

	const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message
	const [isLoading, setIsLoading] = useState(false); // State to manage loading state

	const handleStaffIdChange = (event) => {
		setStaffId(event.target.value);
		// Clear the error message when the user starts typing
		setErrorMessage("");
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		// Clear the error message when the user starts typing
		setErrorMessage("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!staffId || !password) {
			setErrorMessage("No Staff Id or pin"); // Set the error message
			return;
		}

		try {
			setIsLoading(true);

			const response = await axios.post(
				"https://jkd6735.pythonanywhere.com/api/auth/lecturer/login/",
				// "http://127.0.0.1:8000/api/auth/lecturer/login/",
				{
					lecturer_id: staffId,
					pin: password,

					// lecturer_id: "10826194", // Hardcoded staffId
					// pin: "12345", // Hardcoded password
				},
				{
					headers: {
						"Content-Type": "application/json",
						// Add any additional headers if required
					},
				}
			);

			// Handle successful login
			console.log(response.data.message);
			const Data = response?.data?.data;
			// console.log(Data);

			// Store additional data in local storage
			localStorage.setItem("userData", JSON.stringify(Data));

			setUserData(Data);

			// Storing token
			const {token} = response.data;
			localStorage.setItem("token", token);
			if (localStorage.token) {
				setIsAuth(true);
				setTimeout(() => {
					// Redirect
					window.location.href = "/home";
				}, 1000);
			}
		} catch (error) {
			// Handle login error
			console.error(error.response.data);
			setErrorMessage("Login failed. Please check your credentials."); // Set error message on login failure
		} finally {
			setIsLoading(false); // Set loading to false when the request completes (whether success or error)
		}
	};

	// Use useEffect to automatically submit the form when the component mounts
	// useEffect(() => {
	// 	handleSubmit(setIsAuth, setUserData);
	// }, []);

	return (
		<div className="container min-h-screen flex justify-center items-center">
			{/* Box */}
			<div className="bg-white md:w-3/5 rounded-2xl">
				<div className="bg-primary rounded-t-2xl py-5">
					<h1 className="text-white text-center md:text-[36px] sm:text-2xl">
						regiMark - Dashboard
					</h1>
				</div>

				{/* Whitebox  */}
				<div className="flex flex-col md:px-32 pb-32 pt-20 sm:px-20">
					{/* Input */}
					<h1 className="text-primary text-center mb-5 md:text-[32px] sm:text-2xl ">
						Lecturer Login
					</h1>

					<form>
						<div className="sm:col-span-1">
							<div className="my-3">
								<input
									type="number"
									name="staff-id"
									id="staff-id"
									autoComplete="staff-id"
									placeholder="Staff ID"
									className="block w-full border-b-2 border-0 py-1.5 text-gray-900 sm:text-lg sm:leading-10"
									value={staffId}
									onChange={handleStaffIdChange}
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<div className="my-3">
								<input
									type="password"
									name="password"
									id="password"
									autoComplete="password"
									placeholder="Password"
									className="block w-full border-b-2 border-0 py-1.5 text-gray-900 sm:text-lg sm:leading-10"
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>
						</div>

						{/* Displaying error  */}
						{/* Display the error message if it's not empty */}
						{errorMessage && <div className="text-red-500">{errorMessage}</div>}

						{/* Button
						{isLoading ? (
							// <div className="text-primary text-center my-2">Logging in...</div>

							<Sentry className="" />
						) : (
							<button onClick={handleSubmit} className="my-10">
								Login
							</button>
						)} */}

						{/* Button }
						{/* {isLoading ? (
							<div className="flex gap-3 text-center items-center justify-center my-2">
								<div>
									<Sentry className="mx-auto" /> 
								</div>
								<p>Logging in...</p>
							</div>
						) : (
							<button onClick={handleSubmit} className="my-10">
								Login
							</button>

						)} */}

						{/* Button */}
						{isLoading ? (
							<button className="flex gap-3 text-center items-center justify-center">
								<div>
									<Spinner className="mx-auto" size={20} />
								</div>
								<p>Logging in...</p>
							</button>
						) : (
							<button onClick={handleSubmit} className="my-10">
								{isLoading ? "Logging in..." : "Login"}
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
