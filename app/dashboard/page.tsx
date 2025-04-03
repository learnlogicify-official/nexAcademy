import React from "react";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Dashboard
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Track your progress, view your submissions, and manage your account.
          </p>
        </div>
        <div className="mt-16 text-center text-gray-600">
          <p>Dashboard features coming soon!</p>
        </div>
      </div>
    </main>
  );
} 