const pool = require('../config/database');

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content, categoryId, tags } = req.body;

    if (!title || !content || !categoryId) {
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }

    const connection = await pool.getConnection();

    const tagsJson = tags ? JSON.stringify(tags) : null;

    const [result] = await connection.execute(
      'INSERT INTO posts (user_id, title, content, category_id, tags) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, content, categoryId, tagsJson]
    );

    connection.release();

    res.status(201).json({
      message: 'Post created successfully',
      postId: result.insertId
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, categoryId, search } = req.query;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();

    let query = `
      SELECT p.id, p.title, p.content, p.views, p.created_at, p.category_id,
             u.id as userId, u.name, u.avatar_url,
             (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes,
             (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments,
             c.name as categoryName
      FROM posts p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;

    const params = [];

    if (categoryId) {
      query += ' AND p.category_id = ?';
      params.push(categoryId);
    }

    if (search) {
      query += ' AND (p.title LIKE ? OR p.content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [posts] = await connection.execute(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM posts WHERE 1=1';
    const countParams = [];

    if (categoryId) {
      countQuery += ' AND category_id = ?';
      countParams.push(categoryId);
    }

    if (search) {
      countQuery += ' AND (title LIKE ? OR content LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const [countResult] = await connection.execute(countQuery, countParams);

    connection.release();

    res.json({
      posts: posts.map(p => ({
        id: p.id,
        title: p.title,
        content: p.content.substring(0, 200) + '...',
        views: p.views,
        likes: p.likes,
        comments: p.comments,
        category: p.categoryName,
        author: {
          id: p.userId,
          name: p.name,
          avatar: p.avatar_url
        },
        createdAt: p.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get single post
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    // Increment views
    await connection.execute('UPDATE posts SET views = views + 1 WHERE id = ?', [id]);

    const [posts] = await connection.execute(`
      SELECT p.*, u.id as userId, u.name, u.avatar_url, u.email,
             (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes,
             (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments,
             c.name as categoryName
      FROM posts p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id]);

    if (posts.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = posts[0];

    // Get comments
    const [comments] = await connection.execute(`
      SELECT c.*, u.name, u.avatar_url
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
    `, [id]);

    connection.release();

    res.json({
      id: post.id,
      title: post.title,
      content: post.content,
      views: post.views,
      likes: post.likes,
      tags: post.tags ? JSON.parse(post.tags) : [],
      category: post.categoryName,
      author: {
        id: post.userId,
        name: post.name,
        email: post.email,
        avatar: post.avatar_url
      },
      comments: comments.map(c => ({
        id: c.id,
        content: c.content,
        author: {
          id: c.user_id,
          name: c.name,
          avatar: c.avatar_url
        },
        createdAt: c.created_at
      })),
      createdAt: post.created_at,
      updatedAt: post.updated_at
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryId, tags } = req.body;

    const connection = await pool.getConnection();

    // Check ownership
    const [posts] = await connection.execute('SELECT user_id FROM posts WHERE id = ?', [id]);

    if (posts.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Post not found' });
    }

    if (posts[0].user_id !== req.user.id) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    const tagsJson = tags ? JSON.stringify(tags) : null;

    await connection.execute(
      'UPDATE posts SET title = ?, content = ?, category_id = ?, tags = ? WHERE id = ?',
      [title, content, categoryId, tagsJson, id]
    );

    connection.release();

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    // Check ownership
    const [posts] = await connection.execute('SELECT user_id FROM posts WHERE id = ?', [id]);

    if (posts.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Post not found' });
    }

    if (posts[0].user_id !== req.user.id) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await connection.execute('DELETE FROM posts WHERE id = ?', [id]);

    connection.release();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Like post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const connection = await pool.getConnection();

    // Check if already liked
    const [existing] = await connection.execute(
      'SELECT id FROM likes WHERE user_id = ? AND post_id = ?',
      [req.user.id, postId]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({ error: 'Already liked this post' });
    }

    await connection.execute(
      'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
      [req.user.id, postId]
    );

    connection.release();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
};

// Unlike post
exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const connection = await pool.getConnection();

    await connection.execute(
      'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
      [req.user.id, postId]
    );

    connection.release();

    res.json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Unlike post error:', error);
    res.status(500).json({ error: 'Failed to unlike post' });
  }
};
