const pool = require('../config/database');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const connection = await pool.getConnection();

    const [users] = await connection.execute(
      'SELECT id, name, email, bio, avatar_url, skills, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // Get user stats
    const [postStats] = await connection.execute(
      'SELECT COUNT(*) as count FROM posts WHERE user_id = ?',
      [userId]
    );

    const [followerStats] = await connection.execute(
      'SELECT COUNT(*) as followers FROM followers WHERE following_id = ?',
      [userId]
    );

    const [followingStats] = await connection.execute(
      'SELECT COUNT(*) as following FROM followers WHERE follower_id = ?',
      [userId]
    );

    connection.release();

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      skills: user.skills ? JSON.parse(user.skills) : [],
      posts: postStats[0].count,
      followers: followerStats[0].followers,
      following: followingStats[0].following,
      createdAt: user.created_at
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, skills, avatarUrl } = req.body;
    const connection = await pool.getConnection();

    const skillsJson = skills ? JSON.stringify(skills) : null;

    await connection.execute(
      'UPDATE users SET name = ?, bio = ?, skills = ?, avatar_url = ? WHERE id = ?',
      [name || null, bio || null, skillsJson, avatarUrl || null, req.user.id]
    );

    connection.release();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Follow user
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.id.toString()) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const connection = await pool.getConnection();

    // Check if already following
    const [existing] = await connection.execute(
      'SELECT id FROM followers WHERE follower_id = ? AND following_id = ?',
      [req.user.id, userId]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({ error: 'Already following this user' });
    }

    await connection.execute(
      'INSERT INTO followers (follower_id, following_id) VALUES (?, ?)',
      [req.user.id, userId]
    );

    connection.release();

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
};

// Unfollow user
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const connection = await pool.getConnection();

    await connection.execute(
      'DELETE FROM followers WHERE follower_id = ? AND following_id = ?',
      [req.user.id, userId]
    );

    connection.release();

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Unfollow user error:', error);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
};

// Get trending users
exports.getTrendingUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [users] = await connection.execute(`
      SELECT u.id, u.name, u.bio, u.avatar_url, 
             (SELECT COUNT(*) FROM followers WHERE following_id = u.id) as followers
      FROM users u
      ORDER BY followers DESC
      LIMIT 5
    `);

    connection.release();

    res.json(users.map(u => ({
      id: u.id,
      name: u.name,
      bio: u.bio,
      avatarUrl: u.avatar_url,
      followers: u.followers
    })));
  } catch (error) {
    console.error('Get trending users error:', error);
    res.status(500).json({ error: 'Failed to fetch trending users' });
  }
};
