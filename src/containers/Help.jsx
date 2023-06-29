import React from "react";
import { Sidebar, Topbar } from "../components";

const Help = () => {
	return (
		<div className="flex gap-5 md:m-5 sm:mt-5 sm:mr-5">
			<div className="">
				<Sidebar />
			</div>
			<div className="flex flex-col gap-5 w-full">
				<div className="">
					<Topbar />
				</div>

				{/* Help information here */}

				<div className="md:ml-80 flex flex-grow bg-white rounded-2xl justify-center items-center h-screen">
					<h1 className="text-primary">Help and Information Here!</h1>
				</div>
			</div>
		</div>
	);
};

export default Help;
