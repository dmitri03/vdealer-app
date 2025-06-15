"use server";

import connectDB from "@/data/db";
import Owner from "@/data/models/Owner";

export const createCustomer = async (formData: FormData) => {
  await connectDB();

  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  if (!isValidEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    const existing = await Owner.findOne({ email });
    if (existing) {
      return { error: "A customer with this email already exists." };
    }

    const owner = await Owner.create({ name, email });
    return { success: "Customer created successfully", owner };
  } catch (error) {
    console.error("Create Customer Error:", error);
    return { error: "Failed to create customer." };
  }
};

export const getCustomers = async () => {
  await connectDB();

  try {
    const owners = await Owner.find();
    return { success: "Customers fetched successfully", owners };
  } catch (error) {
    console.error("Get Customers Error:", error);
    return { error: "Failed to fetch customers." };
  }
};

export const getCustomerById = async (id: string) => {
  await connectDB();

  if (!id) {
    return { error: "Customer ID is required." };
  }

  try {
    const owner = await Owner.findById(id);
    if (!owner) {
      return { error: "Customer not found." };
    }
    return { success: "Customer fetched successfully", owner };
  } catch (error) {
    console.error("Get Customer By ID Error:", error);
    return { error: "Failed to fetch customer." };
  }
};

export const updateCustomer = async (id: string, formData: FormData) => {
  await connectDB();

  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  if (!isValidEmail(email)) {
    return { error: "Invalid email format." };
  }

  try {
    const owner = await Owner.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!owner) {
      return { error: "Customer not found." };
    }
    return { success: "Customer updated successfully", owner };
  } catch (error) {
    console.error("Update Customer Error:", error);
    return { error: "Failed to update customer." };
  }
};


const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};