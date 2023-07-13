import React, {useContext} from "react";
import Logo from "./../assets/logo.png";
import Profile from "./../assets/profile.png";
import AuthContext from "../context/AuthProvider";
import Notify from "./../assets/notification.png";

const Topbar = () => {
	// const { userData } = useContext(AuthContext);

	const userData = JSON.parse(localStorage.getItem("userData"));

	const today = new Date();
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
				<h1 className="md:flex sm:hidden">
					{userData?.first_name} {""} {userData?.last_name}{" "}
				</h1>
			</div>
			<div className="text-neutral-700 text-[24px] font-medium">
				{formattedDate}
			</div>
			<div className="rounded-full p-3 bg-[#e5e5e5]">
				<img src={Notify} alt="" />
			</div>
		</div>
	);
};

export default Topbar;
