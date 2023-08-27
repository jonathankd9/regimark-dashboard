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

				<div className="flex gap-16 py-5 px-10 bg-white rounded-2xl justify-start h-screen">
					<div className="w-[50%]">
						<h1 className="text-primary">How it works?</h1>
						<p className="mb-10 text-lg">
							Step-by-step process for instructors
						</p>
						<div className="text-xl flex flex-col gap-5">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
								euismod, diam at bibendum consectetur, ligula lorem malesuada
								ex, nec volutpat neque sapien in dolor.
							</p>
							<p>
								Nunc euismod fermentum orci, in volutpat tortor lacinia a.
								Aenean vehicula convallis urna, ac malesuada tellus viverra sit
								amet. Nulla facilisi. Vivamus hendrerit aliquet odio, non
								finibus ligula tristique vel. Curabitur in urna mi. Nullam eu
								dui vel ligula efficitur rhoncus.
							</p>
							<p>
								In hac habitasse platea dictumst. Ut ullamcorper urna sit amet
								ante varius, sit amet efficitur dui eleifend. Sed euismod, diam
								at bibendum consectetur, ligula lorem malesuada ex, nec volutpat
								neque sapien in dolor.
							</p>
						</div>
					</div>
					<div className="w-[50%]">
						<h1 className="text-primary">FAQs</h1>
						<p className="mb-10 text-lg">Questions asked often?</p>

						<div className="">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
							</p>
							<p>Nunc euismod fermentum orci, in volutpat tortor lacinia a.</p>
							<p>
								In hac habitasse platea dictumst. Ut ullamcorper urna sit amet
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Help;
