import React from "react";
import { Sidebar, Topbar } from "../components";

const History = () => {
	return (
		<div className="flex gap-5 md:m-5 sm:mt-5 sm:mr-5">
			<div className="">
				<Sidebar />
			</div>
			<div className="flex flex-col gap-5 w-full">
				<div className="">
					<Topbar />
				</div>

				{/* History */}

				<div className="md:ml-80 flex flex-grow bg-white rounded-2xl justify-center items-center h-screen">
					<h1 className="text-primary">History Here!</h1>
				</div>
			</div>
		</div>
	);
};

export default History;
