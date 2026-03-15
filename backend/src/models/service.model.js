import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    rating: { type: String, enum: ["A","B","C","D","E"], required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);