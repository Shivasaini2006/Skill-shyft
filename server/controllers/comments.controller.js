const pool = require('../config/database');

// Create comment
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const connection = await pool.getConnection();

    const [result] = await connection.execute(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, req.user.id, content]
    );

    connection.release();

    res.status(201).json({
      message: 'Comment created successfully',
      commentId: result.insertId
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Get post comments
exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();

    const [comments] = await connection.execute(`
      SELECT c.id, c.content, c.created_at, u.id as userId, u.name, u.avatar_url
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `, [postId, parseInt(limit), offset]);

    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM comments WHERE post_id = ?',
      [postId]
    );

    connection.release();

    res.json({
      comments: comments.map(c => ({
        id: c.id,
        content: c.content,
        author: {
          id: c.userId,
          name: c.name,
          avatar: c.avatar_url
        },
        createdAt: c.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const connection = await pool.getConnection();

    // Check ownership
    const [comments] = await connection.execute(
      'SELECT user_id FROM comments WHERE id = ?',
      [commentId]
    );

    if (comments.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comments[0].user_id !== req.user.id) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized to update this comment' });
    }

    await connection.execute(
      'UPDATE comments SET content = ? WHERE id = ?',
      [content, commentId]
    );

    connection.release();

    res.json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const connection = await pool.getConnection();

    // Check ownership
    const [comments] = await connection.execute(
      'SELECT user_id FROM comments WHERE id = ?',
      [commentId]
    );

    if (comments.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comments[0].user_id !== req.user.id) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    await connection.execute('DELETE FROM comments WHERE id = ?', [commentId]);

    connection.release();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
