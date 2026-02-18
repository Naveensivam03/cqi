const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../data/credentials.json');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(credentialsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading credentials:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                res.json({ success: true, message: 'Login successful', user: { username: user.username } });
            } else {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        } catch (parseErr) {
            console.error('Error parsing credentials:', parseErr);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
});

module.exports = router;
