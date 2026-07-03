const {Router, response} = require("express");
const pool = require('../../SecurityMail/database/dbConnection');

const router = Router();

router.post('/api/save-token-user', async (req, res) => {
    const { token, user_id } = req.body;
    try {
        const user = await pool.query('SELECT * FROM SITE_TOKENS WHERE user_id = $1', [user_id]);
        const isUserFound = user.rows.length;
        if (isUserFound) {
            await pool.query('UPDATE site_tokens SET token = $1 WHERE user_id = $2;', [token, user_id]);
            res.status(200).json({ message: 'Token updated successfully' });
        } else {
            const query = 'INSERT INTO site_tokens (token, user_id) VALUES ($1, $2)';
            await pool.query(query, [token, user_id]);
            res.status(200).json({ message: 'Token saved successfully' });
        }

    } catch (error) {
        console.error('Error saving token:', error);
        res.status(500).json({ error: 'Failed to save token' });
    }
});

module.exports = router;