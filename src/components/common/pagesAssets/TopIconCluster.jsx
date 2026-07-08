import React from "react";
import { MessageCircle, Bell } from "lucide-react";

function TopIconCluster({
  chatBadge = 9,
  notificationBadge = 5,
  avatarUrl = "",
  userName = "User",
}) {
  return (
    <div className="flex items-center justify-end gap-3 pb-4">
      {/* Chat button */}
      <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-800">
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
        {chatBadge > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            {chatBadge}
          </span>
        )}
      </button>

      {/* Notifications button */}
      <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-800">
        <Bell className="h-4 w-4" strokeWidth={2} />
        {notificationBadge > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            {notificationBadge}
          </span>
        )}
      </button>

      {/* Avatar */}
      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
        {avatarUrl ? (
          <img src={avatarUrl} alt={userName} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gray-300" />
        )}
      </div>
    </div>
  );
}

export default TopIconCluster;