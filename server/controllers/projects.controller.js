const pool = require('../config/database');

exports.getPublicProjects = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    // Fetch all projects for public view (or you can filter by a specific status if desired)
    const [projects] = await connection.execute(
      'SELECT id, name, description, status, thumbnail as image_url, github_url, live_url, created_at FROM projects ORDER BY created_at DESC'
    );
    connection.release();
    res.json(projects);
  } catch (error) {
    console.error('Get public projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
