import React, {useState, useEffect} from "react";
import {Sidebar, Topbar} from "../components";
import axios from "axios";

const data = [
	{id: 1, name: "John Doe", age: 25, city: "New York", country: "USA"},
	{id: 2, name: "Jane Smith", age: 30, city: "London", country: "UK"},
	{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
	{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
	{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
	{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
	{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
];

const History = () => {
	const BASE_URL = "https://jkd6735.pythonanywhere.com";

	const [newattendance, setNewAttendance] = useState("");

	const token = localStorage.getItem("token");

	console.log(token);

	// Viewing attendance
	useEffect(() => {
		axios
			.get(`${BASE_URL}/api/attendance/`, {
				params: {
					courseCode: selectedCourseCode,
				},
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((response) => {
				const newattendance = response.data.attendances;
				console.log(newattendance);
				setNewAttendance(newattendance);
			})
			.catch((error) => {
				console.error("Failed to retrieve attendances:", error);
				// Handle error if needed
			});
	}, []);

	return (
		<div className="flex gap-5 flex-row md:m-5 sm:mt-5 sm:mr-5">
			{/* Sidebar */}
			<div className="flex md:w-[20%] justify-center">
				<Sidebar />
			</div>

			<div className="flex flex-col md:w-[80%] gap-5 sm:w-full">
				{/* Topbar section */}
				<div className="">
					<Topbar />
				</div>

				{/* History */}

				<div className="px-10 pt-5 flex flex-col flex-grow bg-white rounded-2xl min-h-screen">
					{/* Third Section */}
					<h1>Recent Attendance</h1>
					<table className="min-w-full bg-white">
						<thead>
							<tr>
								<th className="py-3 px-4 border-b border-gray-200 font-bold uppercase">
									ID
								</th>
								<th className="py-3 px-4 border-b border-gray-200 font-bold uppercase">
									Name
								</th>
								<th className="py-3 px-4 border-b border-gray-200 font-bold uppercase">
									Age
								</th>
								<th className="py-3 px-4 border-b border-gray-200 font-bold uppercase">
									City
								</th>
								<th className="py-3 px-4 border-b border-gray-200 font-bold uppercase">
									Country
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr key={item.id}>
									<td className="py-3 px-4 border-b border-gray-200">
										{item.id}
									</td>
									<td className="py-3 px-4 border-b border-gray-200">
										{item.name}
									</td>
									<td className="py-3 px-4 border-b border-gray-200">
										{item.age}
									</td>
									<td className="py-3 px-4 border-b border-gray-200">
										{item.city}
									</td>
									<td className="py-3 px-4 border-b border-gray-200">
										{item.country}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default History;
