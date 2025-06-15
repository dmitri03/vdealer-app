"use server";

import connectDB from "@/data/db";
import Vehicle from "@/data/models/Vehicle";
import Owner from "@/data/models/Owner";

export async function createVehicle(ownerId: string, formData: FormData) {
  try {
    await connectDB();

    const make = formData.get("make") as string;
    const carModel = formData.get("carModel") as string;
    const year = parseInt(formData.get("year") as string);
    const mileage = parseInt(formData.get("mileage") as string);
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;

    const vehicle = await Vehicle.create({
      make,
      carModel,
      year,
      mileage,
      price,
      description,
      status,
      owner: ownerId,
    });

    await Owner.findByIdAndUpdate(ownerId, {
      $push: { vehicles: vehicle._id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating Vehicle:", error);
    return { success: false, error: "Failed to create vehicle" };
  }
}

export async function getVehiclesByOwner(ownerId: string) {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({ owner: ownerId });
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
    const carModel = formData.get("carModel") as string;
    const year = parseInt(formData.get("year") as string);
    const mileage = parseInt(formData.get("mileage") as string);
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;

    await Vehicle.findByIdAndUpdate(vehicleId, {
      make,
      carModel,
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
