import React from "react";
import {Sidebar, Topbar} from "../components";

const Help = () => {
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

				{/* Help information here */}

				<div className="flex flex-grow bg-white rounded-2xl justify-center items-center min-h-screen">
					<h1 className="text-primary">Help and Information Here!</h1>
				</div>
			</div>
		</div>
	);
};

export default Help;
