"use client";
import React from "react";
import DashboardNavBar from "../../../components/DashboardNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dashboard min-h-[100vh] flex gap-x-4">
      <DashboardNavBar />
      <div className="p-4 bg-headerColor grow dashboard-content text-white flex flex-col">
        {children}
      </div>
    </main>
  );
}
