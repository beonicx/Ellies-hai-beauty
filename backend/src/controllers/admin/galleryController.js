const Gallery = require("../../models/Gallery");

async function getAllImages(req, res) {
  try {
    const { category, isActive } = req.query;
    const filter = {};

    if (category && category !== "all") filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const images = await Gallery.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (err) {
    console.error("Get gallery error:", err);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
}

async function createImage(req, res) {
  try {
    const { title, category, image, description, sortOrder } = req.body;

    if (!title || !category || !image) {
      return res.status(400).json({ error: "Title, category and image URL are required" });
    }

    const entry = await Gallery.create({ title, category, image, description, sortOrder });
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    console.error("Create gallery error:", err);
    res.status(500).json({ error: "Failed to add gallery image" });
  }
}

async function updateImage(req, res) {
  try {
    const fields = ["title", "category", "image", "description", "isActive", "sortOrder"];
    const updates = {};
    for (const f of fields) {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    }

    const entry = await Gallery.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!entry) {
      return res.status(404).json({ error: "Gallery image not found" });
    }

    res.json({ success: true, data: entry });
  } catch (err) {
    console.error("Update gallery error:", err);
    res.status(500).json({ error: "Failed to update gallery image" });
  }
}

async function deleteImage(req, res) {
  try {
    const entry = await Gallery.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    res.json({ success: true, message: "Gallery image deleted" });
  } catch (err) {
    console.error("Delete gallery error:", err);
    res.status(500).json({ error: "Failed to delete gallery image" });
  }
}

async function reorderImages(req, res) {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Items array is required" });
    }

    const ops = items.map((item, index) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { sortOrder: index },
      },
    }));

    await Gallery.bulkWrite(ops);
    res.json({ success: true, message: "Gallery reordered" });
  } catch (err) {
    console.error("Reorder gallery error:", err);
    res.status(500).json({ error: "Failed to reorder gallery" });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Gallery.distinct("category", { isActive: true });
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error("Get gallery categories error:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

module.exports = {
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
  reorderImages,
  getCategories,
};
