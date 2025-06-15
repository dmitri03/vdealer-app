/* eslint-disable */

import connectDB from "@/data/db";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MotorTrade</h1>
        <p className="mb-8 text-gray-600">
          Your trusted car dealer
        </p>

        <div className="space-y-4">
          <div className="space-x-4">
            <Link
              href="/customers/create"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Register New Customer
            </Link>
            <Link
              href="/vehicles/list"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              View All Vehicles 
            </Link>
            <Link
              href="/customers"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              View All Customers 
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}