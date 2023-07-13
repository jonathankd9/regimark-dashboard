import React, {useState} from "react";
import {Sidebar, Topbar} from "../components";
import QRContainer from "./../assets/qr-code-container.png";
import axios from "axios";

const Home = () => {
	// Dropdown of courses

	const userData = JSON.parse(localStorage.getItem("userData"));

	const [qrcodeUrl, setQRCodeUrl] = useState("");

	const handleGenerateQRCode = async () => {
		try {
			// Make an API request to generate the QR code using the token from local storage
			const token = localStorage.getItem("token");
			const response = await axios.post(
				"http://127.0.0.1:8000/api/dashboard/lecturer/generate-qrcode",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Set the generated QR code URL in the state
			setQRCodeUrl(response.data.qrcodeUrl);
		} catch (error) {
			console.error("Failed to generate QR code:", error);
		}
	};

	const [selectedOption, setSelectedOption] = useState("");

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const data = [
		{id: 1, name: "John Doe", age: 25, city: "New York", country: "USA"},
		{id: 2, name: "Jane Smith", age: 30, city: "London", country: "UK"},
		{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
		{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
		{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
		{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
		{id: 3, name: "Bob Johnson", age: 35, city: "Paris", country: "France"},
	];
	return (
		<div className="flex gap-5 md:m-5 sm:mt-5 sm:mr-5">
			<div className="">
				<Sidebar />
			</div>
			<div className="flex flex-col gap-5 ">
				<div className="">
					<Topbar />
				</div>

				{/* Inside contents */}
				<div className="md:ml-80">
					<div className="flex gap-5 mb-5 md:flex-row sm:flex-col ">
						{/* Left Section */}
						<div className="p-10 basis-2/5 flex-col gap-y-4 h-4/12 bg-white rounded-2xl">
							<div className="text-[20px] text-neutral-700 text-center">
								<span className="font-normal leading-loose">
									Select a course and then click{" "}
								</span>
								<span className="font-bold leading-loose">“Generate”</span>
								<span className=" font-normal leading-loose">
									{" "}
									button below to generate unique QR Code for marking attendance
								</span>
							</div>
							<div className="mb-5">
								<select
									value={selectedOption}
									onChange={handleSelectChange}
									className="text-[20px] w-full h-16 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Select an option</option>
									<option value="option1">
										DCIT 406 - Advanced Networking
									</option>
									<option value="option2">Option 2</option>
									<option value="option3">Option 3</option>
								</select>
								{selectedOption && (
									<p className="text-green-600 mt-4">
										Selected option: {selectedOption}
									</p>
								)}
							</div>
							<button onClick={handleGenerateQRCode}>Generate</button>
						</div>

						{/* Right Section */}
						<div className="flex md:flex-row gap-10 p-10 basis-3/5 h-4/12 bg-white rounded-2xl sm:flex-col">
							<div className="flex-1 flex flex-col gap-5 ">
								<div className="flex justify-center">
									<img className="w-64 h-64" src={QRContainer} alt="" />
								</div>
								<div className="text-[24px] text-center">
									<p className="">Time Left:</p>
									<p>59:00</p>
								</div>
							</div>
							<div className="flex-1 flex flex-col gap-5">
								<div className="text-[24px]">
									<p className="font-bold">DCIT 406 - Advanced Networking</p>
									<p>DCIT 406 - Advanced Networking</p>
								</div>
								<button>Print QR Code</button>
								<button>End Class</button>
							</div>
						</div>
					</div>
					<div className="px-10 pt-5 flex flex-col flex-grow bg-white rounded-2xl">
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
		</div>
	);
};

export default Home;
