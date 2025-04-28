import MemoButton from '@/components/button/memo-button';
import SidebarButton from "@/components/button/memo-sidebar-button";
import MemoPopUp from '@/components/container/memo-popup-notime';
import LogoIcon from "@/components/ui/icons/logo";
import SignOutIcon from "@/components/ui/icons/sidebar-icons/sign-out";
import TrashIcon from "@/components/ui/icons/sidebar-icons/trashIcon";
import UserlistIcon from "@/components/ui/icons/sidebar-icons/user-list";
import UsersIcon from "@/components/ui/icons/sidebar-icons/users";
import WarningIcon from "@/components/ui/icons/sidebar-icons/warningIcon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [user, setUser] = useState<any>()

  const menuItems = [
    { name: "รายชื่อ", path: "/dashboard/user-management", icon: <UserlistIcon /> },
    { name: "จัดการผู้ดูแลระบบ", path: "/dashboard/admin-management", icon: <UsersIcon /> },
    { name: "คำขอสร้างบัญชี", path: "/dashboard/requests", icon: <WarningIcon /> },
    { name: "ถังขยะ", path: "/dashboard/user-delete", icon: <TrashIcon /> },

  ];

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    function parseJwt(token: string) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
    const user = parseJwt(token as string)
    setUser(user)
    
  },[])

  function formatString(str: string | undefined, mock: string) {
    if (str === undefined || str.trim() === '')
      return mock
    return str
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    router.push("/");
  };

  return (
    <div className="w-80 bg-primary-2 h-screen flex flex-col p-4 text-white justify-between overflow-hidden relative">
      <div className="z-0 absolute -top-32 -left-48 opacity-20 w-96 h-96 border-[8rem] border-primary-3 rounded-full"/>
      <div className="z-0 absolute -bottom-32 -left-32 opacity-20 w-96 h-96 border-[8rem] border-primary-3 rounded-full"/>
      <div className="z-10">
        <div className="flex items-center space-x-4 mt-2 mb-6">
          <LogoIcon className="w-15 h-15" />
          <p className="text-system-white font-bold text-[20px]">MEMO</p>
        </div>

        <div className="bg-system-light-gray rounded-[15px] flex flex-col p-6 relative overflow-hidden">
          <div className="z-0 absolute -top-7 -right-7 opacity-10 w-20 h-20 border-[1.75rem] border-body-1 rounded-full"/>
          <div className="z-0 absolute -bottom-10 right-8 opacity-10 w-20 h-20 border-[1.75rem] border-body-1 rounded-full"/>
          <p className="z-10 text-title-1 text-[16px] font-bold mb-1">{formatString(user?.firstName, "ดวงเจริญ")} {formatString(user?.lastName, "สิวะสุธรรม")}</p>
          <p className="z-10 text-body-1 text-[14px]">{formatString(user?.position,"ครูประจำฝ่ายธุรการ")}</p>
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
        className="z-10 text-[14px] py-3 px-4 mb-2 w-full rounded-[15px] flex items-center text-system-white bg-transparent hover:bg-system-white hover:bg-opacity-25 cursor-pointer transition-colors"
        onClick={() => setShowLogoutPopup(true)}
      >
        <SignOutIcon className="w-6 h-6 mr-2" />
        ออกจากระบบ
      </button>

      {showLogoutPopup && (
        <MemoPopUp show={showLogoutPopup} onClose={() => setShowLogoutPopup(false)}>
          <SignOutIcon className="w-44 h-44 p-6 pr-4 mr-2 bg-system-error-2 mb-6 rounded-full mt-6" />
          <p className="text-center text-[18px] font-bold">ต้องการออกจากระบบจัดการรายชื่อหรือไม่?</p>
          <div className="flex justify-between mt-6 w-full space-x-2 [16px] pl-4 pr-4 mb-2">
            <MemoButton title="ยกเลิก" variant="cancleghost" onClick={() => setShowLogoutPopup(false)}/>
            <MemoButton  title="ยืนยัน" variant="cancle" onClick={handleSignout} />
          </div>
        </MemoPopUp>
      )}
    </div>
  );
};

export default Sidebar;
