import React, {useContext} from "react";
import Logo from "./../assets/logo.png";
import Profile from "./../assets/profile.png";
import AuthContext from "../context/AuthProvider";
import Notify from "./../assets/notification.png";
import {GiHamburgerMenu} from "react-icons/gi";

import {Drawer, IconButton} from "@material-tailwind/react";

const Topbar = () => {
	// const { userData } = useContext(AuthContext);

	// Defining drawer
	const [open, setOpen] = React.useState(false);

	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

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
					{userData?.user_info.first_name} {""} {userData?.user_info.last_name}
				</h1>
				<h1 className="md:hidden text-center">Screen title </h1>
			</div>
			<div className="text-neutral-700 text-[24px] font-medium sm:hidden">
				{formattedDate}
			</div>
			<div className="rounded-full p-3 bg-[#e5e5e5]">
				<img className="md:flex sm:hidden" src={Notify} alt="" />
				<GiHamburgerMenu className="md:hidden" onClick={openDrawer} size={30} />
			</div>

			{/* Drawer styling */}

			<Drawer
				open={open}
				onClose={closeDrawer}
				size={500}
				className="p-8 h-full md:hidden">
				<div className="mb-6 flex flex-col items-center justify-center">
					<div className="flex items-center">
						<div>
							<p>Hello there</p>
						</div>
						<div>
							<IconButton
								variant="text"
								color="blue-gray"
								onClick={closeDrawer}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="black"
									className="h-5 w-5">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</IconButton>
						</div>
					</div>

					{/* Links */}
					<ul>
						<li>Hello</li>
						<li>Hello</li>
						<li>Hello</li>
						<li>Hello</li>
						<li>Hello</li>
					</ul>
				</div>
			</Drawer>
		</div>
	);
};

export default Topbar;
