const pool = require('../../../SecurityMail/database/dbConnection');
const queries = require('../../database/queries/SubscriptionQueries');
const { getUserById } = require('../../database/queries/UserQueries');
const { validateAddSubscription } = require('../functions/validation/subscriptions/subscriptionAddValidation')
const { validateUpdateSubscription } = require('../functions/validation/subscriptions/subscriptionUpdateValidation')

const getSubscriptions = (req, res) => {
    pool.query(queries.getSubscriptions, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results.rows);
    });
};

const getSubscriptionById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = pool.query(queries.getSubscriptionById, [id])
    result.then(result => {
        if (!result.rows.length) {
            res.send("Subscription not found")
        } else {
            const data = result.rows;
            const formattedData = JSON.stringify(data, null, 2);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(formattedData);
        }
    }).catch(err => {
        console.error(err);
        next(err);
    });
};

const getSubscriptionsByUserId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(getUserById, [id]);

        if (!result.rows.length) {
            res.send("User not found");
        } else {
            const data = await pool.query(queries.getSubscriptionsByUserId, [id]);
            const formattedData = JSON.stringify(data.rows, null, 2);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(formattedData);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const addSubscription = async (req, res) => {
    try {
        const { user_id, start_date, end_date } = req.body;

        const isUserExist = await pool.query(getUserById, [user_id]);
        const isValid = validateAddSubscription({ start_date, end_date }, res);

        if (!isUserExist.rows.length) {
            res.send("No user found");
        } else if (!isValid) {
            return;
        } else {
            await pool.query(queries.addSubscription, [user_id, start_date, end_date]);
            res.status(201).send("Subscription added successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const updateSubscription = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { start_date, end_date } = req.body;
        const result = await pool.query(queries.getSubscriptionById, [id]);
        const isValid = validateUpdateSubscription({ start_date, end_date }, res);

        if (!result.rows.length) {
            res.status(404).send("Subscription not found");
        } else if (!isValid) {
            return;
        } else {
            await pool.query(queries.updateSubscription, [id, start_date, end_date]);
            res.send("Subscription updated successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(queries.getSubscriptionById, [id]);

        if (!result.rows.length) {
            res.status(404).send('Subscription not found');
        } else {
            await pool.query(queries.deleteSubscription, [id]);
            res.status(200).send('Subscription deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting subscription');
    }
};

module.exports = {
    getSubscriptions,
    getSubscriptionById,
    getSubscriptionsByUserId,
    addSubscription,
    updateSubscription,
    deleteSubscription
};