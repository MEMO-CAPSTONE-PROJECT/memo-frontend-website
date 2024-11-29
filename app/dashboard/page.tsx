// pages/dashboard.tsx
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Home</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Analytics</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Reports</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to the Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">User Name</span>
            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-700">General overview of the system's performance.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-gray-700">Key metrics and analytics for this period.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Reports</h3>
            <p className="text-gray-700">Latest reports and detailed data insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
