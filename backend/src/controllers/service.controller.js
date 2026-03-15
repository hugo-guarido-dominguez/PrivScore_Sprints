// src/controllers/services.controller.js
import { Service } from "../models/service.model.js";

export async function listServices(req, res, next) {
  try {
    const { q = "", rating = "", category = "" } = req.query;

    const filter = {};
    if (rating) filter.rating = rating;
    if (category) filter.category = category;
    if (q) {
      const re = new RegExp(q, "i");
      filter.$or = [{ name: re }, { domain: re }];
    }

    const items = await Service.find(filter).sort({ updatedAt: -1 }).lean();
    res.json(items); // <- si no hay datos: []
  } catch (e) {
    next(e);
  }
}

export async function getService(req, res, next) {
  try {
    const item = await Service.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ ok: false, error: "Not Found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
}