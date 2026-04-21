const pool = require('../config/database');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [categories] = await connection.execute(`
      SELECT c.*, COUNT(p.id) as postCount
      FROM categories c
      LEFT JOIN posts p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.name
    `);

    connection.release();

    res.json(categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      postCount: cat.postCount
    })));
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get category details
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    const [categories] = await connection.execute(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    if (categories.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Category not found' });
    }

    connection.release();

    res.json(categories[0]);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};
