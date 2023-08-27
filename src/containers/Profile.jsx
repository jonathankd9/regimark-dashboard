import React from "react";
import {Sidebar, Topbar} from "../components";
import ProfileIcon from "./../assets/bigprofile.png";

const Profile = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));

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

				{/* Lecturer profile */}
				<div className="text-center flex flex-col flex-grow bg-white rounded-2xl justify-center items-center min-h-screen">
					<img src={ProfileIcon} alt="" />
					<div className="my-3">
						<p class="text-neutral-400 text-xl font-normal ">Name</p>
						<p class="text-stone-900 text-2xl font-bold">
							{userData?.user_info.first_name} {userData?.user_info.last_name}
						</p>
					</div>
					<div className="my-3">
						<p class="text-neutral-400 text-xl font-normal">Staff ID</p>
						<p className="text-stone-900 text-2xl font-bold">
							{userData?.user_info.user_id}
						</p>
					</div>
					<div className="my-3">
						<p class="text-neutral-400 text-xl font-normal">Levels Assigned</p>
						{[...new Set(userData?.courses.map((course) => course.level))].map(
							(level, index) => (
								<p key={index} className="text-stone-900 text-2xl font-bold">
									{level}
								</p>
							)
						)}
					</div>
					<div className="my-3">
						<p class="text-neutral-400 text-xl font-normal">
							Courses Registered
						</p>
						{userData?.courses.map((course, index) => (
							<p key={index} className="text-stone-900 text-2xl font-bold">
								{course.code} - {course.title}
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
