"use server";

import connectDB from "@/data/db";
import Vehicle from "@/data/models/Vehicle";
import Owner from "@/data/models/Owner";

export async function createVehicle(customerId: string, formData: FormData) {
  try {
    await connectDB();

    const make = formData.get("make") as string;
    const vehicle_model = formData.get("vehicle_model") as string;
    const year = parseInt(formData.get("year") as string);
    const mileage = parseInt(formData.get("mileage") as string);
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;

    const vehicle = await Vehicle.create({
      make,
      vehicle_model,
      year,
      mileage,
      price,
      description,
      status,
      owner: customerId,
    });

    await Owner.findByIdAndUpdate(customerId, {
      $push: { vehicles: vehicle._id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating Vehicle:", error);
    return { success: false, error: "Failed to create vehicle" };
  }
}

export async function getVehiclesByOwner(customerId: string) {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({ owner: customerId });
    return vehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}

export async function getVehicleById(vehicleId: string) {
  try {
    await connectDB();
    const vehicle = await Vehicle.findById(vehicleId);
    return vehicle;
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    return null;
  }
}

export async function deleteVehicleById(vehicleId: string) {
  try {
    await connectDB();
    await Vehicle.findByIdAndDelete(vehicleId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return { success: false, error: "Failed to delete vehicle" };
  }
}

export async function updateVehicle(vehicleId: string, formData: FormData) {
  try {
    await connectDB();

    const make = formData.get("make") as string;
    const vehicle_model = formData.get("vehicle_model") as string;
    const year = parseInt(formData.get("year") as string);
    const mileage = parseInt(formData.get("mileage") as string);
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;

    await Vehicle.findByIdAndUpdate(vehicleId, {
      make,
      vehicle_model,
      year,
      mileage,
      price,
      description,
      status,
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return { success: false, error: "Failed to update vehicle" };
  }
}

export async function updateVehicleByForm(vehicleId: string, formData: FormData) {
  return updateVehicle(vehicleId, formData); // Simply call updateVehicle
}


export async function fetchVehicles(search?: string) {
  await connectDB();

  const query = search
    ? {
        $or: [
          { make: { $regex: search, $options: "i" } },
          { vehicle_model: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const vehicles = await Vehicle.find(query).lean(); // Use Vehicle model here
  return vehicles;
} 


export async function filterVehiclesByPrice(minPrice?: number, maxPrice?: number) {
  await connectDB();

  const priceQuery: any = {};
  if (minPrice !== undefined) priceQuery.$gte = minPrice;
  if (maxPrice !== undefined) priceQuery.$lte = maxPrice;

  const query = Object.keys(priceQuery).length ? { price: priceQuery } : {};

  return Vehicle.find(query).lean();
}

export async function sortVehicles(
  sortBy: string = "price",
  order: "asc" | "desc" = "asc"
) {
  await connectDB();

  // Validate allowed fields to sort by
  const allowedSortFields = ["price", "year", "mileage", "make", "vehicle_model"];
  if (!allowedSortFields.includes(sortBy)) sortBy = "price";

  const sortOrder = order === "desc" ? -1 : 1;
  const sortObj: any = {};
  sortObj[sortBy] = sortOrder;

  return Vehicle.find({}).sort(sortObj).lean();
}