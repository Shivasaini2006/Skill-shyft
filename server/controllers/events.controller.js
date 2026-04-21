const pool = require('../config/database');

// Create event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, type, startDate, endDate, location, maxParticipants, imageUrl } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: 'Title and type are required' });
    }

    const connection = await pool.getConnection();

    const [result] = await connection.execute(
      'INSERT INTO events (title, description, type, start_date, end_date, organizer_id, location, max_participants, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, type, startDate, endDate, req.user.id, location, maxParticipants, imageUrl]
    );

    connection.release();

    res.status(201).json({
      message: 'Event created successfully',
      eventId: result.insertId
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();

    let query = `
      SELECT e.*, u.name as organizerName, u.avatar_url,
             COUNT(DISTINCT ep.user_id) as participants
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      LEFT JOIN event_participants ep ON e.id = ep.event_id
      WHERE 1=1
    `;

    const params = [];

    if (type) {
      query += ' AND e.type = ?';
      params.push(type);
    }

    query += ' GROUP BY e.id ORDER BY e.start_date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [events] = await connection.execute(query, params);

    // Get count
    let countQuery = 'SELECT COUNT(*) as total FROM events WHERE 1=1';
    const countParams = [];

    if (type) {
      countQuery += ' AND type = ?';
      countParams.push(type);
    }

    const [countResult] = await connection.execute(countQuery, countParams);

    connection.release();

    res.json({
      events: events.map(e => ({
        id: e.id,
        title: e.title,
        description: e.description,
        type: e.type,
        startDate: e.start_date,
        endDate: e.end_date,
        location: e.location,
        maxParticipants: e.max_participants,
        participants: e.participants,
        imageUrl: e.image_url,
        organizer: {
          name: e.organizerName,
          avatar: e.avatar_url
        }
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    const [events] = await connection.execute(
      'SELECT e.*, u.name as organizerName, u.email as organizerEmail FROM events e JOIN users u ON e.organizer_id = u.id WHERE e.id = ?',
      [id]
    );

    if (events.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Event not found' });
    }

    const [participants] = await connection.execute(
      'SELECT u.id, u.name, u.avatar_url FROM event_participants ep JOIN users u ON ep.user_id = u.id WHERE ep.event_id = ?',
      [id]
    );

    connection.release();

    const event = events[0];
    res.json({
      id: event.id,
      title: event.title,
      description: event.description,
      type: event.type,
      startDate: event.start_date,
      endDate: event.end_date,
      location: event.location,
      maxParticipants: event.max_participants,
      imageUrl: event.image_url,
      organizer: {
        name: event.organizerName,
        email: event.organizerEmail
      },
      participants: participants.map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar_url
      }))
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Join event
exports.joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const connection = await pool.getConnection();

    // Check if already joined
    const [existing] = await connection.execute(
      'SELECT id FROM event_participants WHERE event_id = ? AND user_id = ?',
      [eventId, req.user.id]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({ error: 'Already joined this event' });
    }

    // Check max participants
    const [eventData] = await connection.execute(
      'SELECT max_participants FROM events WHERE id = ?',
      [eventId]
    );

    if (eventData.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Event not found' });
    }

    const [currentParticipants] = await connection.execute(
      'SELECT COUNT(*) as count FROM event_participants WHERE event_id = ?',
      [eventId]
    );

    if (eventData[0].max_participants && currentParticipants[0].count >= eventData[0].max_participants) {
      connection.release();
      return res.status(409).json({ error: 'Event is full' });
    }

    await connection.execute(
      'INSERT INTO event_participants (event_id, user_id) VALUES (?, ?)',
      [eventId, req.user.id]
    );

    connection.release();

    res.json({ message: 'Successfully joined event' });
  } catch (error) {
    console.error('Join event error:', error);
    res.status(500).json({ error: 'Failed to join event' });
  }
};

// Leave event
exports.leaveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const connection = await pool.getConnection();

    await connection.execute(
      'DELETE FROM event_participants WHERE event_id = ? AND user_id = ?',
      [eventId, req.user.id]
    );

    connection.release();

    res.json({ message: 'Successfully left event' });
  } catch (error) {
    console.error('Leave event error:', error);
    res.status(500).json({ error: 'Failed to leave event' });
  }
};
