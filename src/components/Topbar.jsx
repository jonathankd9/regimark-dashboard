import React, {useContext} from "react";
import Profile from "./../assets/profile.png";
import {NavLink} from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Logout from "./../assets/sidebar/Logout.svg";

const Topbar = () => {
	const {handleLogout} = useContext(AuthContext);

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
		<div className="flex px-10 py-5 bg-white justify-between items-center rounded-2xl">
			<div className="flex gap-5 items-center">
				<NavLink to="/profile">
					<img
						className="w-16 h-16 md:hover:bg-[#e5e5e5] md:hover:scale-110"
						// onClick={handleProfile}
						src={Profile}
						alt=""
					/>
				</NavLink>

				<div className="flex-col">
					<p className="text-[22px]">Welcome</p>
					<p className="md:flex sm:hidden text-[28px] font-bold">
						{userData?.user_info.first_name} {""}{" "}
						{userData?.user_info.last_name}
					</p>
					<p className="md:hidden text-center text-base">
						{/* {userData?.user_info.first_name} */}
					</p>
				</div>
			</div>
			<div className="text-neutral-700 text-[24px] flex font-medium">
				{formattedDate}
			</div>

			<div className="rounded-full p-3 hover:bg-gray-800 bg-[#e5e5e5]">
				<img className="w-8 h-8 " src={Logout} onClick={handleLogout} alt="" />
			</div>
		</div>
	);
};

export default Topbar;
