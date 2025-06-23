/* eslint-disable */

import Link from "next/link";
import { fetchVehicles, filterVehiclesByPrice,sortVehicles } from "@/actions/vehicle-actions";
import SearchBar from "@/app/components/VehicleSearchBar";
import FilterByPrice from "@/app/components/FilterByPrice";

import SortBy from "@/app/components/SortByPrice";

type SearchParams = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export default async function AllVehiclesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const searchTerm = await searchParams?.search || "";
  const minPrice = await searchParams?.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice =await searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined;
  const sortBy =await searchParams?.sortBy || "price";
  const order = await searchParams?.order === "desc" ? "desc" : "asc";

  let vehicles = [];

  // Decide priority/order:
  // If price filter present, filter by price (no search or sort)
  // Else if search present, search (no sort)
  // Else if sort present, sort all vehicles
  // Else all vehicles default

  if (minPrice !== undefined || maxPrice !== undefined) {
    vehicles = await filterVehiclesByPrice(minPrice, maxPrice);
  } else if (searchTerm) {
    vehicles = await fetchVehicles(searchTerm);
  } else if (sortBy) {
    vehicles = await sortVehicles(sortBy, order);
  } else {
    vehicles = await sortVehicles(); // default sort by price asc
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Vehicles</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Back to Home
          </Link>
        </div>

        <SearchBar defaultValue={searchTerm} />

        <FilterByPrice defaultMin={minPrice ?? 0} defaultMax={maxPrice ?? 1000000} />

        <SortBy defaultSortBy={sortBy} defaultOrder={order} />

        <div className="bg-white shadow rounded mt-6">
          {vehicles.length === 0 ? (
            <p className="p-4 text-black">No vehicles found</p>
          ) : (
            <ul className="divide-y">
              {vehicles.map((vehicle: any) => (
                <li key={vehicle._id.toString()} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-medium text-lg text-black">
                        {vehicle.make} {vehicle.vehicle_model} ({vehicle.year})
                      </h2>
                      <p className="text-gray-700">
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