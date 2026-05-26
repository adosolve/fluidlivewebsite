import express from 'express';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET /api/jobs/all - Get all jobs including drafts (admin only)
// MUST be before /:id route to avoid matching 'all' as an id
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const db = req.app.get('db');
    const { rows } = await db.query(
      'SELECT * FROM jobs ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/jobs - Get all published jobs (public)
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    const { rows } = await db.query(
      'SELECT * FROM jobs WHERE published = true ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST /api/jobs - Create a new job (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, location, job_type, experience_level, skills, salary_range, apply_link, published } = req.body;

    if (!title || !description || !location || !job_type || !experience_level) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get('db');
    const { rows } = await db.query(
      'INSERT INTO jobs (title, description, location, job_type, experience_level, skills, salary_range, apply_link, published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, description, location, job_type, experience_level, skills || [], salary_range || null, apply_link || null, published !== false]
    );

    res.status(201).json({ success: true, job: rows[0] });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// PUT /api/jobs/:id - Update a job (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, job_type, experience_level, skills, salary_range, apply_link, published } = req.body;

    if (!title || !description || !location || !job_type || !experience_level) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.get('db');
    const { rows } = await db.query(
      'UPDATE jobs SET title = $1, description = $2, location = $3, job_type = $4, experience_level = $5, skills = $6, salary_range = $7, apply_link = $8, published = $9, updated_at = NOW() WHERE id = $10 RETURNING *',
      [title, description, location, job_type, experience_level, skills || [], salary_range || null, apply_link || null, published !== false, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ success: true, job: rows[0] });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE /api/jobs/:id - Delete a job (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.get('db');
    const { rows } = await db.query('DELETE FROM jobs WHERE id = $1 RETURNING id', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

export default router;
