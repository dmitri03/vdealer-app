/* eslint-disable */

import Link from "next/link";
import connectDB from "@/data/db";
import Vehicle from "@/data/models/Vehicle";
import Owner from "@/data/models/Owner";

async function getAllVehiclesWithOwners() {
  await connectDB();

  const vehicles = await Vehicle.find({}).populate("owner", "name email");
  return vehicles;
}

export default async function AllVehiclesPage() {
  const vehicles = await getAllVehiclesWithOwners();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Vehicles</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Back to Home
          </Link>
        </div>

        <div className="bg-white shadow rounded">
          {vehicles.length === 0 ? (
            <p className="p-4 text-black">No vehicles found</p>
          ) : (
            <ul className="divide-y">
              {vehicles.map((vehicle: any) => (
                <li key={vehicle._id.toString()} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-medium text-lg text-black">
                        {vehicle.make} {vehicle.carModel} ({vehicle.year})
                      </h2>
                      <p className="text-gray-700">
                        <strong>Owner:</strong> {vehicle.owner?.name || "Unknown"} <br />
                        <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles <br />
                        <strong>Price:</strong> ${vehicle.price.toLocaleString()} <br />
                        <strong>Status:</strong> {vehicle.status} <br />
                        <strong>Description:</strong> {vehicle.description} <br />
                      </p>
                    </div>
                    <div className="space-x-4">
                      <Link
                        href={`/vehicles/${vehicle._id}`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
