const pool = require('../config/database');

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Fetch counts
    const [[{ totalUsers }]] = await connection.query('SELECT COUNT(*) as totalUsers FROM users');
    const [[{ totalBlogs }]] = await connection.query('SELECT COUNT(*) as totalBlogs FROM blogs');
    const [[{ totalProjects }]] = await connection.query('SELECT COUNT(*) as totalProjects FROM projects');
    const [[{ totalTeam }]] = await connection.query('SELECT COUNT(*) as totalTeam FROM team_members');

    // Recent activities (mocked from users/blogs for now if activity_logs is empty, or just use activity_logs)
    const [activities] = await connection.query(`
      SELECT a.*, u.name as user_name 
      FROM activity_logs a 
      LEFT JOIN users u ON a.user_id = u.id 
      ORDER BY a.created_at DESC 
      LIMIT 10
    `);

    connection.release();

    res.json({
      stats: {
        totalUsers,
        totalBlogs,
        totalProjects,
        totalTeam
      },
      recentActivities: activities
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

// --- Team Management ---

exports.getTeamMembers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [members] = await connection.query('SELECT * FROM team_members ORDER BY created_at DESC');
    connection.release();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, bio, email, avatar_url, skills, github_url, linkedin_url, twitter_url, portfolio_url, is_featured, is_active } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO team_members (name, role, bio, email, avatar_url, skills, github_url, linkedin_url, twitter_url, portfolio_url, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, role, bio, email, avatar_url || null, JSON.stringify(skills || []), github_url || null, linkedin_url || null, twitter_url || null, portfolio_url || null, is_featured ? 1 : 0, is_active === false ? 0 : 1]
    );
    connection.release();
    res.json({ message: 'Team member created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, bio, email, avatar_url, skills, github_url, linkedin_url, twitter_url, portfolio_url, is_featured, is_active } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE team_members SET name=?, role=?, bio=?, email=?, avatar_url=?, skills=?, github_url=?, linkedin_url=?, twitter_url=?, portfolio_url=?, is_featured=?, is_active=? WHERE id=?',
      [name, role, bio, email, avatar_url || null, JSON.stringify(skills || []), github_url || null, linkedin_url || null, twitter_url || null, portfolio_url || null, is_featured ? 1 : 0, is_active === false ? 0 : 1, id]
    );
    connection.release();
    res.json({ message: 'Team member updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM team_members WHERE id=?', [id]);
    connection.release();
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};

// --- Blogs Management ---

exports.getBlogs = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [blogs] = await connection.query('SELECT * FROM blogs ORDER BY created_at DESC');
    connection.release();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, slug, content, status } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO blogs (title, slug, content, status, author_id) VALUES (?, ?, ?, ?, ?)',
      [title, slug, content, status || 'draft', req.user.id]
    );
    connection.release();
    res.json({ message: 'Blog created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

// --- Projects Management ---

exports.getProjects = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [projects] = await connection.query('SELECT * FROM projects ORDER BY created_at DESC');
    connection.release();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, status, image_url, github_url, live_url } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO projects (name, description, status, thumbnail, github_url, live_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, status || 'planned', image_url || null, github_url || null, live_url || null]
    );
    connection.release();
    res.json({ message: 'Project created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// --- Updates Management ---
exports.getUpdates = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [updates] = await connection.query('SELECT * FROM community_updates ORDER BY created_at DESC');
    connection.release();
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
};

exports.createUpdate = async (req, res) => {
  try {
    const { title, content, image_url, type, is_pinned } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO community_updates (title, content, image_url, type, is_pinned, published_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [title, content, image_url || null, type || 'general', is_pinned ? 1 : 0]
    );
    connection.release();
    res.json({ message: 'Update created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create update' });
  }
};

exports.deleteUpdate = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM community_updates WHERE id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Update deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete update' });
  }
};

// --- Settings Management ---
exports.getSettings = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [settings] = await connection.query('SELECT * FROM settings');
    connection.release();
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.setting_key] = s.setting_value;
    });
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    const connection = await pool.getConnection();
    for (const [key, value] of Object.entries(updates)) {
      await connection.query(
        'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, JSON.stringify(value), JSON.stringify(value)]
      );
    }
    connection.release();
    res.json({ message: 'Settings updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
};
