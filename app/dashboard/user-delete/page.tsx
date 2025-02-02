"use client";
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import TopbarButton from "@/components/button/memo-topbar";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");

  return (
    <div className="flex bg-system-white w-screen">
      <Sidebar />

      <div className="ml-4 pt-8 p-6 text-title-1 w-full">
        <div className="flex space-x-10">
          <TopbarButton
            name="รายชื่อครู"
            isActive={activeMenu === "รายชื่อครู"}
            onClick={() => setActiveMenu("รายชื่อครู")}
          />
          <TopbarButton
            name="รายชื่อนักเรียน"
            isActive={activeMenu === "รายชื่อนักเรียน"}
            onClick={() => setActiveMenu("รายชื่อนักเรียน")}
          />
        </div>

        <div className="pt-4">
          <p className="text-[20px] font-semibold">ระบบลบรายชื่อนักเรียน</p>
          <p className="text-[16px] text-body-2">ระบบลบรายชื่อนักเรียน</p>
        </div>

      

      </div>
    </div>
  );
};

export default Dashboard;
