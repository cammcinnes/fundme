const express = require('express');
const projQuery = require('../queries/projection');

const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const result = await projQuery.getAllTables();
    return res.json({ success: true, result: { tableNames: result } });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
});

router.post('/', async(req, res) => {
  try {
    const { table, attributes } = req.body;
    if (!table | !attributes) {
      return res.status(400).json({success: false, error: 'Missing selected table and attributes'});
    }
    const result = await projQuery.runQuery(table, attributes);
    return res.json({ success: true, result });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
});

router.get('/attributes/:table', async(req, res) => {
  try {
    const { table } = req.params;
    const result = await projQuery.getTableAttributes(table);
    return res.json({ success: true, result: { tableAttributes: result } });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
});

module.exports = router;
