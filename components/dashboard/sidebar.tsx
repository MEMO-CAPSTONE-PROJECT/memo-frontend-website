import React from "react";
import LogoIcon from "@/components/ui/icons/logo";
import UserlistIcon from "@/components/ui/icons/sidebar-icons/user-list";
import UsersIcon from "@/components/ui/icons/sidebar-icons/users";
import WarningIcon from "@/components/ui/icons/sidebar-icons/warningIcon";
import TrashIcon from "@/components/ui/icons/sidebar-icons/trashIcon";
import GearIcon from "@/components/ui/icons/sidebar-icons/gearIcon";
import SignOutIcon from "@/components/ui/icons/sidebar-icons/sign-out";
import SidebarButton from "@/components/button/memo-sidebar-button";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "รายชื่อ", path: "/dashboard/user-management", icon: <UserlistIcon /> },
    { name: "จัดการผู้ดูแลระบบ", path: "/dashboard/admin-management", icon: <UsersIcon /> },
    { name: "คำขอสร้างบัญชี", path: "/dashboard/report", icon: <WarningIcon /> },
    { name: "ถังขยะ", path: "/dashboard/user-delete", icon: <TrashIcon /> },
    { name: "จัดการโปรไฟล์", path: "/dashboard/setting", icon: <GearIcon /> },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSignout = () => {
    console.log("Signing out...");
    router.push("/");
  };

  return (
    <div className="w-[17%] bg-primary-2 h-screen flex flex-col p-4 text-white justify-between">
      <div>
        <div className="flex items-center space-x-4 mt-2 mb-6">
          <LogoIcon className="w-15 h-15" />
          <p className="text-system-white font-bold text-[20px]">MEMO</p>
        </div>

        <div className="bg-system-light-gray rounded-[15px] flex flex-col p-6">
          <p className="text-title-1 text-[16px] font-bold mb-1">นายดวงเจริญ สิวะสุธรรม</p>
          <p className="text-body-1 text-[14px]">ครูประจำฝ่ายธุรการ</p>
        </div>

        <div className="mt-4">
          {menuItems.map((item) => (
            <SidebarButton
              key={item.path}
              name={item.name}
              icon={item.icon}
              isActive={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>
      </div>

      <button
          className={`
            text-[14px] py-3 px-4 mb-2 w-full
            rounded-[15px] flex items-center text-system-white
            isActive ? "bg-primary-2-hover" : "bg-transparent "
            hover:bg-system-white hover:bg-opacity-25
            cursor-pointer transition-colors
          `}
        onClick={handleSignout}
      >
        <SignOutIcon className="w-6 h-6 mr-2" />
        ออกจากระบบ
      </button>
    </div>
  );
};

export default Sidebar;
