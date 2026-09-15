const Service = require("../../models/Service");

async function getAllServices(req, res) {
  try {
    const { category, isActive, search } = req.query;
    const filter = {};

    if (category) filter.categorySlug = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const services = await Service.find(filter).sort({ categorySlug: 1, sortOrder: 1 });

    const grouped = {};
    for (const s of services) {
      if (!grouped[s.categorySlug]) {
        grouped[s.categorySlug] = {
          category: s.category,
          slug: s.categorySlug,
          description: s.categoryDescription,
          icon: s.categoryIcon,
          items: [],
        };
      }
      grouped[s.categorySlug].items.push(s);
    }

    res.json({ success: true, data: Object.values(grouped), raw: services });
  } catch (err) {
    console.error("Get services error:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
}

async function getServiceById(req, res) {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    console.error("Get service error:", err);
    res.status(500).json({ error: "Failed to fetch service" });
  }
}

async function createService(req, res) {
  try {
    const {
      category,
      categorySlug,
      categoryDescription,
      categoryIcon,
      name,
      description,
      price,
      duration,
      image,
      sortOrder,
    } = req.body;

    if (!category || !categorySlug || !name || price === undefined || !duration) {
      return res.status(400).json({ error: "Category, name, price and duration are required" });
    }

    const service = await Service.create({
      category,
      categorySlug,
      categoryDescription,
      categoryIcon,
      name,
      description,
      price,
      duration,
      image,
      sortOrder,
    });

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    console.error("Create service error:", err);
    res.status(500).json({ error: "Failed to create service" });
  }
}

async function updateService(req, res) {
  try {
    const updates = {};
    const fields = [
      "category", "categorySlug", "categoryDescription", "categoryIcon",
      "name", "description", "price", "duration", "image", "isActive", "sortOrder",
    ];

    for (const field of fields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ success: true, data: service });
  } catch (err) {
    console.error("Update service error:", err);
    res.status(500).json({ error: "Failed to update service" });
  }
}

async function deleteService(req, res) {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ success: true, message: "Service deactivated" });
  } catch (err) {
    console.error("Delete service error:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
}

async function seedServices(req, res) {
  try {
    const staticServices = require("../../data/staticServices");
    const ops = [];

    for (const cat of staticServices) {
      for (const item of cat.items) {
        ops.push({
          updateOne: {
            filter: { name: item.name, categorySlug: cat.slug },
            update: {
              $setOnInsert: {
                category: cat.category,
                categorySlug: cat.slug,
                categoryDescription: cat.description,
                categoryIcon: cat.icon,
                name: item.name,
                description: item.description,
                price: item.price,
                duration: item.duration,
              },
            },
            upsert: true,
          },
        });
      }
    }

    const result = await Service.bulkWrite(ops);
    res.json({ success: true, message: "Services seeded", data: result });
  } catch (err) {
    console.error("Seed services error:", err);
    res.status(500).json({ error: "Failed to seed services" });
  }
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  seedServices,
};
