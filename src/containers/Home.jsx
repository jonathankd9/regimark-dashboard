import React, {useState, useRef, useEffect} from "react";
import {Sidebar, Topbar} from "../components";
import QRContainer from "./../assets/qr-code-container.png";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AuthContext from "../context/AuthProvider";

// Loading
import {Dots} from "react-activity";
import {Sentry} from "react-activity";
import {Spinner} from "react-activity";
import "react-activity/dist/library.css";
import Download from "../../src/assets/download.svg";

const Home = () => {
	const token = localStorage.getItem("token");

	const [isLoading, setIsLoading] = useState(false); // State to manage loading state

	const BASE_URL = "https://jkd6735.pythonanywhere.com";

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
			  <img src="${BASE_URL}${QRCodeUrl}" alt="QR Code" />
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
		setTimeLeft(300); // Reset the timer to its initial value
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
		qrCodeImage.src = `${BASE_URL}${QRCodeUrl}`;

		// Create a new jsPDF instance
		const pdf = new jsPDF("p", "mm", "a4");

		// Calculate the width and height of the PDF to fit the image
		const pdfWidth = 210;
		const pdfHeight = (qrCodeImage.height * pdfWidth) / qrCodeImage.width;

		// Add the QR code image to the PDF
		pdf.addImage(qrCodeImage, "PNG", 0, 0, pdfWidth, pdfHeight);

		// Use lecturer's first name from userData
		const lecturerFirst = userData?.user_info.first_name || ""; // Default to an empty string if not available
		const lecturerSecond = userData?.user_info.last_name || ""; // Default to an empty string if not available

		// Set font size and add text to the PDF
		pdf.setFontSize(20);
		pdf.text(
			10,
			pdfHeight + 10,
			`Lecturer: ${lecturerFirst} ${lecturerSecond}`
		);
		pdf.text(10, pdfHeight + 20, `Course Title: ${selectedOption}`);

		// Open the browser's print dialog
		pdf.autoPrint();
		window.open(pdf.output("bloburl"), "_blank");
	};

	// const divStyle = {
	// 	backgroundImage: `url(${QRContainer})`,
	// };

	const [QRCodeUrl, setQRCodeUrl] = useState(null);
	const [isQRCodeLoaded, setIsQRCodeLoaded] = useState(false); // Add the isQRCodeLoaded state
	const [timeLeft, setTimeLeft] = useState(300); // Initial time in seconds
	const [timerRunning, setTimerRunning] = useState(false); // To control the timer

	const minutesLeft = Math.floor(timeLeft / 60);
	const secondsLeft = timeLeft % 60;

	const qrCodeRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

	// When the component loads, retrieve the values from localStorage (if they exist)
	useEffect(() => {
		const savedSelectedOption = localStorage.getItem("selectedOption");
		const savedCourseSelected = localStorage.getItem("courseSelected");
		const savedQRCodeData = localStorage.getItem("qrcodeData");
		const savedcourseCode = localStorage.getItem("courseCode");

		if (savedSelectedOption) {
			setSelectedOption(savedSelectedOption);
		}

		if (savedCourseSelected) {
			setcourseSelected(savedCourseSelected);
		}

		if (savedQRCodeData) {
			setQRCodeUrl(savedQRCodeData);
		}
		if (savedcourseCode) {
			setcourseCode(savedcourseCode);
		}
	}, []); // Empty dependency array to run this effect only once when the component loads

	useEffect(() => {
		if (timerRunning && timeLeft > 0) {
			const timer = setTimeout(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);

			// Clean up the timer when the component is unmounted or the QR code is not generated
			return () => clearTimeout(timer);
		} else if (timeLeft === 0) {
			// Timer has run out, clear the QR code
			localStorage.removeItem("qrcodeData");
			setQRCodeUrl(""); // Reset the QRCodeUrl state
		}
	}, [timerRunning, timeLeft]);

	// const [courseId, setCourseId] = useState("");
	const [courseId, setCourseId] = useState(
		localStorage.getItem("courseId") || ""
	);

	const lecturerId = userData?.user_info.id;

	const handleGenerateQRCode = async () => {
		if (!selectedOption) {
			alert("Please select an option before generating a QR code.");
			return;
		}
		try {
			setIsLoading(true);

			localStorage.setItem("courseId", courseId);

			console.log(lecturerId);

			console.log(courseId);
			// Retrieve the token from localStorage
			const token = localStorage.getItem("token");

			const requestData = {
				lecturer: lecturerId,
				course: courseId,
			};

			const response = await axios.post(
				`${BASE_URL}/api/dashboard/lecturer/generate-qrcode/`,
				requestData,

				{
					headers: {
						Authorization: `Token ${token}`, // Include the token in the headers
					},
				}
			);

			console.log("API Response:", response.data);

			// // Extract the token from the response, cool
			const newToken = response.data.token;

			// // Set the token in your state or wherever you want to store it
			// Update the token in localStorage (if it changes)
			if (newToken) {
				localStorage.setItem("token", newToken);
			}

			console.log(response.data.data);

			// const qrCodeUrl = response.data.data.qr_code;
			const qrCodeUrl = response.data.data;
			setQRCodeUrl(qrCodeUrl);

			// Clear the error message since QR code generation was successful
			setErrorMessage("");

			// Save the generated QR code data in localStorage
			localStorage.setItem("qrcodeData", qrCodeUrl);

			// Log the QR code data
			console.log(qrCodeUrl);

			setTimerRunning(true);
			setTimeLeft(300);
		} catch (error) {
			console.error("Error generating QR code:", error);
			console.log("Response data:", error.response.data);

			// Set the error message
			setErrorMessage("QR Code failed to generate.");

			// Clear the QR code when an error occurs
			setQRCodeUrl("");
		} finally {
			setIsLoading(false);
		}
	};

	const [selectedId, setSelectedId] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [courseTitle, setCourseTitle] = useState("");
	const [courseCode, setcourseCode] = useState("");
	const [selectedCourseCode, setSelectedCourseCode] = useState("");
	const [courseselected, setcourseSelected] = useState("");

	const handleSelectChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedOption(selectedValue);

		// const parts = selectedValue.split("-");
		const parts = selectedValue.split("-").map((part) => part.trim());
		const firstPart = parts[0];
		// Extract the course ID from the selected option
		const courseId = firstPart; // The course ID is the selected value

		const secondPart = parts[1];
		console.log(secondPart);
		setSelectedCourseCode(secondPart);
		// console.log(courseCode);

		const thirdPart = parts[2];
		console.log(thirdPart);

		const courseselected = secondPart + thirdPart;
		console.log(courseselected);
		setcourseSelected(courseselected);

		// Now you have the courseId to use as needed
		console.log("Selected Course ID:", courseId);

		// Update selectedId with the course ID
		setSelectedId(courseId);
		console.log(courseId);

		// Save the selected option and courseSelected to localStorage
		localStorage.setItem("selectedOption", selectedValue);
		localStorage.setItem("courseSelected", courseselected);
		localStorage.setItem("Course Code", selectedCourseCode);

		// Update courseTitle based on the selected option
		const selectedCourse = userData?.courses.find((course) => {
			return `${course.code} - ${course.title}` === selectedValue;
		});

		if (selectedCourse) {
			setCourseTitle(selectedCourse.title);
		} else {
			setCourseTitle(""); // Reset to empty if no course is selected
		}
		// Set courseId in the component state if needed
		setCourseId(courseId);
	};

	// Generation of codes
	const generateCodes = async (token) => {
		// Prepare the request data
		const requestData = {
			course_code: selectedCourseCode,
		};
		const Token = localStorage.getItem("token");

		try {
			console.log(selectedCourseCode);

			console.log(requestData);

			console.log(Token);
			const response = await axios.post(`${BASE_URL}/api/codes/`, requestData, {
				headers: {
					Authorization: `Token ${token}`, // Concatenate the token
				},
			});

			// Return the response data, which may contain generated codes
			console.log(response.data);
			return response.data;
		} catch (error) {
			// Handle any errors that occur during the request
			console.error("Error generating codes:", error);
			throw error;
		}
	};

	// Getting codes
	// useEffect(() => {
	// 	axios
	// 		.get(`${BASE_URL}api/codes/`)
	// 		.then((response) => {
	// 			const newcodes = response.data.codes;
	// 			// setCourses(newcourses);
	// 			console.log(newcodes);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Failed to retrieve courses:", error);
	// 			// Handle error if needed
	// 		});
	// }, []);

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

				{/* Inside contents */}
				<div className="flex gap-5 mb-5 min-h-screen sm:flex-col">
					<div className="flex gap-5 mb-5 md:flex-row sm:flex-col ">
						{/* Left Section */}
						<div className="p-10 basis-2/5 flex-col gap-y-4 h-4/12 bg-white rounded-2xl">
							<div className="text-[20px] text-neutral-700 text-center">
								<span className="font-normal leading-loose">
									Select a course and then click
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
									<option value="Select an option">Select an option</option>
									{userData?.courses.map((course) => (
										// <option key={course.id} value={course.id}>
										<option
											key={course.id}
											value={`${course.id}- ${course.code} - ${course.title}`}>
											{course.code} - {course.title}
										</option>
									))}
								</select>
								{selectedOption && (
									<p className="text-green-600 mt-4">
										Selected Course: {selectedOption}
									</p>
								)}
							</div>

							{/* <div className="mb-5">
								<select
									value={selectedOption}
									onChange={handleSelectChange}
									className="text-[20px] w-full h-16 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">Select an option</option>
									{userData?.courses.map((course) => (
										<option key={course.id} value={course.id}>
											{course.code} - {course.title}
										</option>
									))}
								</select>
								{selectedOption && (
									<p className="text-green-600 mt-4">
										Selected Course ID: {selectedOption}
									</p>
								)}
							</div> */}
							<div>
								{/* <button onClick={handleGenerateQRCode}>Generate</button> */}

								{isLoading ? (
									<button className="flex gap-3 text-center items-center justify-center">
										<div>
											<Spinner className="mx-auto" size={20} />
										</div>
										<p>Generating QRCode...</p>
									</button>
								) : (
									<button onClick={handleGenerateQRCode} className="my-10">
										{isLoading ? "Generating QRcode" : "Generate"}
									</button>
								)}
							</div>
						</div>

						{/* Right Section */}
						<div className="flex md:flex-row gap-10 p-10 basis-3/5 h-4/12 bg-white rounded-2xl sm:flex-col">
							<div className="flex-1 flex flex-col gap-5 justify-center">
								<div className="flex justify-center">
									<div className="flex justify-center">
										{errorMessage && (
											<div className="text-red-500 text-center font-bold">
												{errorMessage}
											</div>
										)}

										{QRCodeUrl && (
											<img
												src={`${BASE_URL}${QRCodeUrl}`}
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
									{/* <p className="">Time Left:</p>
									<p>{timeLeft > 0 ? `${timeLeft}:00` : "Time's Up!"}</p> */}

									<p className="">Time Left:</p>
									<p>
										{timeLeft > 0
											? `${minutesLeft} min ${secondsLeft} sec`
											: "Time's Up!"}
									</p>
								</div>
							</div>
							<div className="flex-1 flex flex-col gap-3">
								<div className="text-[24px]">
									<p className="font-bold">
										{/* {selectedOption ? selectedOption : "No Course Selected"} */}
										{courseselected ? courseselected : "No Course Selected"}
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
						<div className="flex flex-row items-center">
							<div className="mr-5">
								<p className="font-bold text-2xl">Unique Attendance Codes</p>
							</div>

							<div className="mr-5">
								<button onClick={generateCodes}>Tap To Generate</button>
							</div>

							<img src={Download} className="w-12 h-12" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
