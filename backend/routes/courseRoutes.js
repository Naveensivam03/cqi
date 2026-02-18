const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data');

// Get course structure (data.json)
router.get('/structure', (req, res) => {
    const filePath = path.join(dataPath, 'data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            return res.status(500).json({ message: 'Error loading course structure' });
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseErr) {
            res.status(500).json({ message: 'Error parsing course structure' });
        }
    });
});

// Get specific course details
router.get('/:filename', (req, res) => {
    const { filename } = req.params;

    // Security check to prevent directory traversal
    if (filename.includes('..') || !filename.endsWith('.json')) {
        return res.status(400).json({ message: 'Invalid filename' });
    }

    const filePath = path.join(dataPath, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Course file not found' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filename}:`, err);
            return res.status(500).json({ message: 'Error loading course details' });
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseErr) {
            res.status(500).json({ message: 'Error parsing course details' });
        }
    });
});

module.exports = router;
