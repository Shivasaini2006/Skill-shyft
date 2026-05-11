const pool = require('../config/database');

exports.getPublicBlogs = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [blogs] = await connection.execute(
      'SELECT id, title, slug, content, created_at FROM blogs WHERE status = "published" ORDER BY created_at DESC'
    );
    connection.release();
    res.json(blogs);
  } catch (error) {
    console.error('Get public blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const connection = await pool.getConnection();
    const [blogs] = await connection.execute(
      'SELECT id, title, slug, content, created_at FROM blogs WHERE slug = ? AND status = "published"',
      [slug]
    );
    connection.release();
    
    if (blogs.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blogs[0]);
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};
