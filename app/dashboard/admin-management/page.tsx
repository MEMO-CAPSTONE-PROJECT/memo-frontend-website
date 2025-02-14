"use client";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";

const Dashboard = () => {

  return (
    <div className="flex bg-system-white w-screen">
      <Sidebar />

      <div className="ml-4 pt-8 p-6 text-title-1 w-full">
        <div className="pt-4">
          <p className="text-[20px] font-semibold">ระบบจัดการรายชื่อผู้ดูแลระบบ</p>
          <p className="text-[16px] text-body-2">ระบบจัดการรายชื่อผู้ดูแลระบบ</p>
        </div>

      

      </div>
    </div>
  );
};

export default Dashboard;
