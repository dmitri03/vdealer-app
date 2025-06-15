import mongoose, { Schema, Document } from "mongoose";

interface IMaintenance {
  name: string;
  cost: number;
  description: string;
  date?: Date;
}

const MaintenanceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const VehicleSchema: Schema = new Schema(
  {
    make: {
      type: String,
      required: true,
    },
    vehicle_model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true, // e.g., "available", "sold", "pending"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    maintenanceHistory: [MaintenanceSchema],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export interface IVehicle extends Document {
  make: string;
  vehicle_model: string;
  year: number;
  mileage: number;
  price: number;
  status: string;
  owner: mongoose.Types.ObjectId;
  description: string;
  maintenanceHistory?: [IMaintenance];
}

export default mongoose.models.Vehicle ||
  mongoose.model<IVehicle>("Vehicle", VehicleSchema);
