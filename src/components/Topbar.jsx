import React, { useContext } from "react";
import Logo from "./../assets/logo.png";
import Profile from "./../assets/profile.png";
import AuthContext from "../context/AuthProvider";

const Topbar = () => {
  const { userData } = useContext(AuthContext);


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
          <h1 className="md:flex sm:hidden">{userData && userData.first_name}</h1>
      </div>
      <div className="text-neutral-700 text-[24px] font-medium">
        {formattedDate}
      </div>
      <div className="">Notification</div>
    </div>
  );
};

export default Topbar;
