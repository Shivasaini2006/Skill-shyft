const pool = require('../config/database');

// Create resource
exports.createResource = async (req, res) => {
  try {
    const { title, description, link, content, tags, categoryId } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const connection = await pool.getConnection();

    const tagsJson = tags ? JSON.stringify(tags) : null;

    const [result] = await connection.execute(
      'INSERT INTO resources (user_id, title, description, link, content, tags, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, title, description, link, content, tagsJson, categoryId]
    );

    connection.release();

    res.status(201).json({
      message: 'Resource created successfully',
      resourceId: result.insertId
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

// Get resources
exports.getResources = async (req, res) => {
  try {
    const { page = 1, limit = 10, categoryId, tags } = req.query;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();

    let query = `
      SELECT r.*, u.name, u.avatar_url, c.name as categoryName
      FROM resources r
      JOIN users u ON r.user_id = u.id
      LEFT JOIN categories c ON r.category_id = c.id
      WHERE 1=1
    `;

    const params = [];

    if (categoryId) {
      query += ' AND r.category_id = ?';
      params.push(categoryId);
    }

    query += ' ORDER BY r.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [resources] = await connection.execute(query, params);

    // Get count
    let countQuery = 'SELECT COUNT(*) as total FROM resources WHERE 1=1';
    const countParams = [];

    if (categoryId) {
      countQuery += ' AND category_id = ?';
      countParams.push(categoryId);
    }

    const [countResult] = await connection.execute(countQuery, countParams);

    connection.release();

    res.json({
      resources: resources.map(r => ({
        id: r.id,
        title: r.title,
        description: r.description,
        link: r.link,
        tags: r.tags ? JSON.parse(r.tags) : [],
        category: r.categoryName,
        author: {
          name: r.name,
          avatar: r.avatar_url
        },
        createdAt: r.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

// Update resource
exports.updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, content, tags, categoryId } = req.body;

    const connection = await pool.getConnection();

    // Check ownership
    const [resources] = await connection.execute('SELECT user_id FROM resources WHERE id = ?', [id]);

    if (resources.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Resource not found' });
    }

    if (resources[0].user_id !== req.user.id) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized to update this resource' });
    }

    const tagsJson = tags ? JSON.stringify(tags) : null;

    await connection.execute(
      'UPDATE resources SET title = ?, description = ?, link = ?, content = ?, tags = ?, category_id = ? WHERE id = ?',
      [title, description, link, content, tagsJson, categoryId, id]
    );

    connection.release();

    res.json({ message: 'Resource updated successfully' });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ error: 'Failed to update resource' });
  }
};

// Delete resource
exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    // Check ownership
    const [resources] = await connection.execute('SELECT user_id FROM resources WHERE id = ?', [id]);

    if (resources.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Resource not found' });
    }

    if (resources[0].user_id !== req.user.id) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized to delete this resource' });
    }

    await connection.execute('DELETE FROM resources WHERE id = ?', [id]);

    connection.release();

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};
