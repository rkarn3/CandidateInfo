// candidates.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db/db');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidates');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Candidate not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone, skills, status, expected_salary, node_experience, react_experience } = req.body;
  const query = 'INSERT INTO candidates (name, email, phone, skills, status, expected_salary, node_experience, react_experience) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const values = [name, email, phone, skills, status, expected_salary, node_experience, react_experience];
  
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error',error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, skills, status, expected_salary, node_experience, react_experience} = req.body;
  const query = 'UPDATE candidates SET name=$1, email=$2, phone=$3, skills=$4, status=$5, expected_salary=$6, node_experience=$7, react_experience=$8 WHERE id=$9 RETURNING *';
  const values = [name, email, phone, skills, status, expected_salary, node_experience, react_experience, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Candidate not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Candidate not found' });
    } else {
      res.json({ message: 'Candidate deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
