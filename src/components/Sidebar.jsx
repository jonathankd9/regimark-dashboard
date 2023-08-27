import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import Logo from "./../assets/logo.png";
import Clock from "./../assets/sidebar/Clock.svg";
import User from "./../assets/sidebar/User.svg";
import Category from "./../assets/sidebar/category.svg";
import Chart from "./../assets/sidebar/chart.svg";
import Book from "./../assets/sidebar/Book-open.svg";
import Help from "./../assets/sidebar/Info-circle.svg";
import Logout from "./../assets/sidebar/Logout.svg";
import AuthContext from "../context/AuthProvider";

const Sidebar = () => {
	const {handleLogout} = useContext(AuthContext);
	return (
		<div className="h-full w-full flex relative justify-start bg-white md:flex flex-col rounded-2xl sm:hidden">
			<div className="p-4 flex justify-center mt-5 mb-10">
				<img src={Logo} alt="" />
			</div>
			<nav className="">
				<ul className="space-y-2">
					<li>
						<NavLink
							to="/home"
							className="flex gap-2 items-center p-4 hover:bg-gray-800 hover:text-white">
							<img className="w-8 h-8" src={Category} alt="" />
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/courses"
							className="flex gap-2 items-center p-4 hover:bg-gray-800 hover:text-white">
							<img className="w-8 h-8" src={Book} alt="" />
							Course Mangt.
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/history"
							className="flex gap-2 items-center p-4 hover:bg-gray-800 hover:text-white">
							<img className="w-8 h-8" src={Clock} alt="" />
							Attendance History
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/report"
							className="flex gap-2 items-center  p-4 hover:bg-gray-800 hover:text-white">
							<img className="w-8 h-8" src={Chart} alt="" />
							Reports & Statistics
						</NavLink>
					</li>
				</ul>
			</nav>

			<nav className="">
				<ul className="space-y-2">
					<li>
						<NavLink
							to="/profile"
							className="flex gap-2 items-center p-4 hover:bg-gray-800 hover:text-white">
							<img className="w-8 h-8" src={User} alt="" />
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/help"
							className="flex gap-2 items-center  p-4 hover:bg-gray-800 hover:text-white">
							<img className="w-8 h-8" src={Help} alt="" />
							Help & Information
						</NavLink>
					</li>
					<li>
						<NavLink
							onClick={handleLogout}
							className="flex gap-2 items-center p-4 hover:bg-gray-800 hover:text-white">
							<img className="w-8 h-8" src={Logout} alt="" />
							Logout
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
