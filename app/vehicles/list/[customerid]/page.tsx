/* eslint-disable */

import Link from "next/link";
import connectDB from "@/data/db";
import Vehicle from "@/data/models/Vehicle";
import Owner from "@/data/models/Owner";
import DeleteVehicleButton from "@/app/components/DeleteVehicleButton"; // assume you have this component
import { getVehiclesByOwner, deleteVehicleById } from "@/actions/vehicle-actions";

// delete handler function
async function handleDelete(formData: FormData) {
  "use server";
  const vehicleId = formData.get("vehicleId") as string;
  if (vehicleId) {
    await deleteVehicleById(vehicleId);
  }
}

const deleteVehicle = async (formData: FormData) => {
  "use server";
  const vehicleId = formData.get("vehicleId") as string;
  if (vehicleId) {
    await deleteVehicleById(vehicleId);
  }
};

async function getCustomerAndVehicles(customerId: string) {
  await connectDB();
  const customerDoc = await Owner.findById(customerId).lean();
  const vehiclesDocs = await getVehiclesByOwner(customerId);
  const customer = customerDoc ? JSON.parse(JSON.stringify(customerDoc)) : null;
  const vehicles = JSON.parse(JSON.stringify(vehiclesDocs));
  return { customer, vehicles };
}

export default async function CustomerVehicles({
  params,
}: {
  params: { customerid: string };
}) {
  const { customer, vehicles } = await getCustomerAndVehicles(params.customerid);

  if (!customer) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600">Customer not found</h1>
          <Link
            href="/vehicles/list"
            className="text-blue-500 hover:text-blue-600 mt-4 inline-block"
          >
            Back to All vehicles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{customer.name}'s vehicles</h1>
            <p className="text-black">{customer.email}</p>
          </div>
          <div className="space-x-4">
            <Link
              href={`/vehicles/create/${customer._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Vehicle
            </Link>
            <Link href="/vehicles/list" className="text-blue-500 hover:text-blue-600">
              All vehicles
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded">
          {vehicles.length === 0 ? (
            <p className="p-4 text-black">No vehicles found for this customer</p>
          ) : (
            <ul className="divide-y">
              {vehicles.map((vehicle: any) => (
                <li key={vehicle._id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-medium text-lg text-black">
                        {vehicle.make} {vehicle.carModel} ({vehicle.year})
                      </h2>
                      <p className="text-gray-700">
                        <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles <br />
                        <strong>Price:</strong> ${vehicle.price.toLocaleString()} <br />
                        <strong>Status:</strong> {vehicle.status} <br />
                        <strong>Description:</strong> {vehicle.description} <br />
                        <strong>Owner ID:</strong> {vehicle.owner} <br />
                      </p>
                    </div>

                    <div className="space-x-4 text-right">
                      <Link
                        href={`/vehicles/edit/${customer._id}/${vehicle._id}`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Edit
                      </Link>
                      <DeleteVehicleButton
                        vehicleId={vehicle._id.toString()}
                        customerId={params.customerid}
                      />
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
