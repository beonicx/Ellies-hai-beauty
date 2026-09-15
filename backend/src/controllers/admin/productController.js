const Product = require("../../models/Product");

async function getAllProducts(req, res) {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      isActive,
      search,
      lowStock,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }
    if (lowStock === "true") {
      filter.$expr = { $lte: ["$stock", "$lowStockThreshold"] };
      filter.isActive = true;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, category, sku, price, costPrice, stock, lowStockThreshold, image, brand } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({ error: "Name, category and price are required" });
    }

    const product = await Product.create({
      name,
      description,
      category,
      sku,
      price,
      costPrice,
      stock,
      lowStockThreshold,
      image,
      brand,
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "A product with this SKU already exists" });
    }
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
}

async function updateProduct(req, res) {
  try {
    const fields = ["name", "description", "category", "sku", "price", "costPrice", "stock", "lowStockThreshold", "image", "brand", "isActive"];
    const updates = {};
    for (const f of fields) {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "A product with this SKU already exists" });
    }
    console.error("Update product error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ success: true, message: "Product deactivated" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

async function updateStock(req, res) {
  try {
    const { adjustment, reason } = req.body;

    if (adjustment === undefined) {
      return res.status(400).json({ error: "Stock adjustment is required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newStock = product.stock + adjustment;
    if (newStock < 0) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    product.stock = newStock;
    await product.save();

    res.json({ success: true, data: product });
  } catch (err) {
    console.error("Update stock error:", err);
    res.status(500).json({ error: "Failed to update stock" });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Product.distinct("category", { isActive: true });
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getCategories,
};
