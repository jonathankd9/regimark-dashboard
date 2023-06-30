import React from "react";
import Logo from "./../assets/logo.png";
import Profile from "./../assets/profile.png";

const Topbar = () => {
	const today = new Date();

	// Specify the date options for formatting
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const formattedDate = today.toLocaleDateString(undefined, options);

	return (
		<div className="flex md:ml-80 p-4 bg-white justify-between items-center rounded-2xl">
			<div className="flex gap-5 items-center">
				<img className="w-16 h-16" src={Profile} alt="" />
				<h1 className="md:flex sm:hidden">Mrs. M. Wilson</h1>
			</div>
			<div className=" text-neutral-700 text-[24px] font-medium">
				{formattedDate}
			</div>
			<div className="">Notification</div>
		</div>
	);
};

export default Topbar;
