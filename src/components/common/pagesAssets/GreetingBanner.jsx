import React from "react";
import sunIcon from "./sun.png";   // adjust path to your assets
import moonIcon from "./moon.png"; // adjust path


function GreetingBanner({ name = "User", subtitle = "Here's what's happening across your platform today." }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const iconSrc = (hour >= 6 && hour < 18) ? sunIcon : moonIcon;
  const iconAlt = (hour >= 6 && hour < 18) ? "Sun" : "Moon";

  return (
    <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#023e95] to-[#0368fb] px-8 py-7 shadow-[0_3px_27px_10px_rgba(198,216,255,0.6)]">
      <div>
        <h1 className="text-[19px] font-bold text-white">{greeting}, {name}</h1>
        <p className="mt-1 text-[15px] text-blue-100">{subtitle}</p>
      </div>
      <div className="flex h-[81px] w-[81px] items-center justify-center">
        <img src={iconSrc} alt={iconAlt} className="h-full w-full object-contain" />
      </div>
    </div>
  );
}

export default GreetingBanner;