// app/vehicles/edit/[customerid]/[vehicleid]/page.tsx

import { getVehicleById, updateVehicleByForm } from "@/actions/vehicle-actions";
import { redirect } from "next/navigation";

export default async function EditVehiclePage({
  params,
}: {
  params: { vehicleid: string; customerid: string };
}) {
  const vehicle = await getVehicleById(params.vehicleid);

  if (!vehicle) {
    return <div className="p-8 text-red-600">Vehicle not found</div>;
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const result = await updateVehicleByForm(params.vehicleid, formData);
    if (result.success) {
      redirect(`/vehicles/list/${params.customerid}`);
    } else {
      throw new Error(result.error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Vehicle</h2>

      <form
        action={handleUpdate}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={vehicle.title}
          required
          className="w-full text-gray-500 border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          defaultValue={vehicle.price}
          required
          min={1000}
          max={1000000}
          className="w-full text-gray-500 border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          defaultValue={vehicle.status}
          required
          className="w-full text-gray-500 border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          defaultValue={vehicle.location}
          required
          className="w-full text-gray-500 border px-3 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          defaultValue={vehicle.description}
          required
          className="w-full text-gray-500 border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
}
