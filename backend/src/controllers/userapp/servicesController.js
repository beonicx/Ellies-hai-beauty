const Service = require("../../models/Service");
const staticServices = require("../../data/staticServices");

const getAllServices = async (req, res) => {
  try {
    const dbServices = await Service.find({ isActive: true }).sort({ categorySlug: 1, sortOrder: 1 });

    if (dbServices.length > 0) {
      const grouped = {};
      for (const s of dbServices) {
        if (!grouped[s.categorySlug]) {
          grouped[s.categorySlug] = {
            category: s.category,
            slug: s.categorySlug,
            description: s.categoryDescription,
            icon: s.categoryIcon,
            items: [],
          };
        }
        grouped[s.categorySlug].items.push({
          id: s._id,
          name: s.name,
          price: s.price,
          duration: s.duration,
          description: s.description,
        });
      }
      return res.json({ success: true, data: Object.values(grouped) });
    }

    res.json({ success: true, data: staticServices });
  } catch (err) {
    res.json({ success: true, data: staticServices });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const dbServices = await Service.find({ categorySlug: slug, isActive: true }).sort({ sortOrder: 1 });

    if (dbServices.length > 0) {
      const first = dbServices[0];
      const data = {
        category: first.category,
        slug: first.categorySlug,
        description: first.categoryDescription,
        icon: first.categoryIcon,
        items: dbServices.map((s) => ({
          id: s._id,
          name: s.name,
          price: s.price,
          duration: s.duration,
          description: s.description,
        })),
      };
      return res.json({ success: true, data });
    }

    const service = staticServices.find((s) => s.slug === slug);
    if (!service) {
      return res.status(404).json({ success: false, error: "Service category not found" });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    const service = staticServices.find((s) => s.slug === req.params.slug);
    if (!service) {
      return res.status(404).json({ success: false, error: "Service category not found" });
    }
    res.json({ success: true, data: service });
  }
};

module.exports = { getAllServices, getServiceBySlug };
