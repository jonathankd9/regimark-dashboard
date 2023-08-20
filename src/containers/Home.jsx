import React, {useState, useRef, useEffect} from "react";
import {Sidebar, Topbar} from "../components";
import QRContainer from "./../assets/qr-code-container.png";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Home = () => {
	const handlePreviewQRCode = () => {
		if (!isQRCodeLoaded) {
			alert("QR code is not loaded yet. Please wait until it's loaded.");
			return;
		}

		// Create a new window to display the QR code in a larger size
		const previewWindow = window.open("", "_blank");
		previewWindow.document.open();
		previewWindow.document.write(`
		  <html>
			<head>
			  <title>QR Code Preview</title>
			  <style>
            body { margin: 0; overflow: hidden; }
            img { width: 100%; height: 100vh; object-fit: contain; cursor: pointer; }
          </style>
			</head>
			<body style="text-align: center;">
			  <h2>QR Code Preview</h2>
			  <img src="http://127.0.0.1:8000${QRCodeUrl}" alt="QR Code" />
			  <p>Click the image to close this preview.</p>
			</body>
		  </html>
		`);
		previewWindow.document.close();

		// Close the preview window when the user clicks the QR code
		previewWindow.document
			.querySelector("img")
			.addEventListener("click", () => {
				previewWindow.close();
			});
	};
	const handleEndClass = () => {
		setTimerRunning(false); // Stop the timer
		setTimeLeft(60); // Reset the timer to its initial value
		setQRCodeUrl(null); // Clear the QR code URL
	};

	const currentDate = new Date();
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const formattedDate = currentDate.toLocaleDateString(undefined, options);

	const userData = JSON.parse(localStorage.getItem("userData"));

	const handlePrintQRCode = () => {
		if (!isQRCodeLoaded) {
			alert("QR code is not loaded yet. Please wait until it's loaded.");
			return;
		}

		// Create a new image element with the QR code URL
		const qrCodeImage = new Image();
		qrCodeImage.src = `http://127.0.0.1:8000${QRCodeUrl}`;

		// Create a new jsPDF instance
		const pdf = new jsPDF("p", "mm", "a4");

		// Calculate the width and height of the PDF to fit the image
		const pdfWidth = 210;
		const pdfHeight = (qrCodeImage.height * pdfWidth) / qrCodeImage.width;

		// Add the QR code image to the PDF
		pdf.addImage(qrCodeImage, "PNG", 0, 0, pdfWidth, pdfHeight);

		// Add additional information to the PDF
		const lecturerName = "";
		const courseTitle = "";

		// Set font size and add text to the PDF
		pdf.setFontSize(20);
		pdf.text(10, pdfHeight + 10, `Lecturer: ${lecturerName}`);
		pdf.text(10, pdfHeight + 20, `Course Title: ${courseTitle}`);

		// Open the browser's print dialog
		pdf.autoPrint();
		window.open(pdf.output("bloburl"), "_blank");
	};

	const divStyle = {
		backgroundImage: `url(${QRContainer})`,
	};
	// Dropdown of courses

	const [QRCodeUrl, setQRCodeUrl] = useState(null);
	const [isQRCodeLoaded, setIsQRCodeLoaded] = useState(false); // Add the isQRCodeLoaded state
	const [timeLeft, setTimeLeft] = useState(60); // Initial time in seconds
	const [timerRunning, setTimerRunning] = useState(false); // To control the timer

	const qrCodeRef = useRef(null);

	useEffect(() => {
		if (timerRunning && timeLeft > 0) {
			const timer = setTimeout(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);

			// Clean up the timer when the component is unmounted or the QR code is not generated
			return () => clearTimeout(timer);
		}
	}, [timerRunning, timeLeft]);

	const handleGenerateQRCode = async () => {
		if (!selectedOption) {
			// If no option is selected, do nothing
			return;
		}
		try {
			const requestData = {
				lecturer: 1, // Replace with the actual lecturer value
				course: 1, // Replace with the actual course value
			};

			const response = await axios.post(
				"http://127.0.0.1:8000/api/dashboard/lecturer/generate-qrcode/",
				requestData,

				{
					headers: {
						Authorization: `Token 6cd0b97d45cad977159d6c890d1ffbbd8523526038169897fd92e2932021b080`, // Replace <token> with the actual token value
					},
					// headers: {
					// 	Authorization: `Token <token>`, // Replace <token> with the actual token value
					// },
				}
			);

			console.log("API Response:", response.data);

			const qrCodeUrl = response.data.data.qr_code;
			setQRCodeUrl(qrCodeUrl);

			setTimerRunning(true);
			setTimeLeft(60);
		} catch (error) {
			console.error("Error generating QR code:", error);
			console.log("Response data:", error.response.data);
		}
	};

	const [selectedOption, setSelectedOption] = useState("");

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);

		// Update courseTitle based on the selected option
		const selectedCourse = userData?.courses.find((course) => {
			return `${course.code} - ${course.title}` === event.target.value;
		});

		if (selectedCourse) {
			setCourseTitle(selectedCourse.title);
		} else {
			setCourseTitle(""); // Reset to empty if no course is selected
		}
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
									button below to generate unique QR Code for marking attendance
								</span>
							</div>
							<div className="mb-5">
								<select
									value={selectedOption}
									onChange={handleSelectChange}
									className="text-[20px] w-full h-16 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Select an option</option>
									{userData?.courses.map((course, index) => (
										<option key={index}>
											{course.code} - {course.title}{" "}
										</option>
									))}
								</select>
								{selectedOption && (
									<p className="text-green-600 mt-4">
										Selected option: {selectedOption}
									</p>
								)}
							</div>
							<div>
								<button onClick={handleGenerateQRCode}>Generate</button>
							</div>
						</div>

						{/* Right Section */}
						<div className="flex md:flex-row gap-10 p-10 basis-3/5 h-4/12 bg-white rounded-2xl sm:flex-col">
							<div className="flex-1 flex flex-col gap-5 ">
								<div className="flex justify-center">
									<div className="flex justify-center" style={divStyle}>
										{QRCodeUrl && (
											<img
												src={`http://127.0.0.1:8000${QRCodeUrl}`}
												alt="QR Code"
												className="qr-code"
												ref={qrCodeRef}
												onLoad={() => setIsQRCodeLoaded(true)}
												// Set isQRCodeLoaded to true when the image is loaded
												style={{border: "1px solid red"}} // Add a border for visibility
											/>
										)}
									</div>
								</div>
								<div className="text-[24px] text-center">
									<p className="">Time Left:</p>
									<p>{timeLeft > 0 ? `${timeLeft}:00` : "Time's Up!"}</p>
								</div>
							</div>
							<div className="flex-1 flex flex-col gap-5">
								<div className="text-[24px]">
									<p className="font-bold">
										{selectedOption ? selectedOption : "No Course Selected"}
									</p>
									<p>{formattedDate}</p>
								</div>

								<button onClick={handlePreviewQRCode}>Preview QR Code</button>
								<button onClick={handlePrintQRCode}>Print QR Code</button>
								<button onClick={handleEndClass}>End Class</button>
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
