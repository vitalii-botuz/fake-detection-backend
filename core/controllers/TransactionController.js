const pool = require('../../../SecurityMail/database/dbConnection');
const queries = require('../../database/queries/TransactionQueries');
const keys = require('../../liqpay/keys')
const axios = require('axios');
const crypto = require('crypto');
const {getUserById} = require('../../database/queries/UserQueries');
const {addSubscription} = require ('../../database/queries/SubscriptionQueries');
const {paymentDataValidation} = require('../functions/paymentDataValidation')
const {validateAddTransaction} = require("../functions/validation/transactions/transactionAddValidation");
const {validateUpdateTransaction} = require("../functions/validation/transactions/transactionUpdateValidation");

const passPayment = async (req, res) => {
    try {
        const {user_id, amount, currency, description, card, card_exp_month, card_exp_year} = req.body
        const user = await pool.query(getUserById, [user_id])
        if (!user.rows.length) {
            res.send("User not found");
            return;
        }
        if (!paymentDataValidation(req, res)) {
            return;
        }
        const lastOrderIdResult = await pool.query(queries.getLastOrderId);
        const lastOrderId = parseInt(lastOrderIdResult.rows[0].order_id) || 0;
        const orderId = lastOrderId + 1;

        const payment = {
            version: 3,
            public_key: keys.publicKey,
            private_key: keys.privateKey,
            action: "pay",
            amount: amount,
            currency: currency,
            description: description,
            order_id: orderId,
            card: card,
            card_exp_month: card_exp_month,
            card_exp_year: card_exp_year
        };

        const jsonData = JSON.stringify(payment);
        const data = Buffer.from(jsonData).toString('base64');

        const signString = keys.privateKey + data + keys.privateKey;
        const sha1hash = crypto.createHash('sha1');
        sha1hash.update(signString);
        const signature = sha1hash.digest('base64');

        const dataValues = new URLSearchParams();
        dataValues.append('data', data);
        dataValues.append('signature', signature);

        const response = await axios.post(keys.liqpayAPIURL, dataValues);
        const result = response.data.status
        await pool.query(queries.addTransaction, [user_id, payment.order_id, amount, currency, result, description, card]);
        if (result === "success") {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + 30);
            await pool.query(addSubscription, [user_id, startDate, endDate]);
            res.status(200).json({ success: true, message: "Payment successful" });
        } else {
            res.status(200).json({ success: false, message: "Failed to process payment" });
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const getTransactions = (req, res) => {
    pool.query(queries.getTransactions, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results.rows);
    });
};

const getTransactionById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = pool.query(queries.getTransactionById, [id])
    result.then(result => {
        if (!result.rows.length) {
            res.send("Transaction not found")
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

const getTransactionsByUserId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(getUserById, [id]);

        if (!result.rows.length) {
            res.send("User not found");
        } else {
            const data = await pool.query(queries.getTransactionsByUserId, [id]);
            const formattedData = JSON.stringify(data.rows, null, 2);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(formattedData);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const addTransaction = async (req, res) => {
    try {
        const { user_id, order_id, amount, currency, status, description, card } = req.body;
        const isUserExist = await pool.query(getUserById, [user_id]);
        const transactionValidation = validateAddTransaction(req.body, res);
        if (!transactionValidation) {
            return;
        }
        if (!isUserExist.rows.length) {
            res.send("No user found");
        } else {
            await pool.query(queries.addTransaction, [user_id, order_id, amount, currency, status, description, card]);
            res.status(201).send("Transaction added successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const updateTransaction = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { order_id, amount, currency, status, description, card } = req.body;
        const result = await pool.query(queries.getTransactionById, [id]);
        const transactionValidation = validateUpdateTransaction(req.body, res);
        if (!transactionValidation) {
            return;
        }
        if (!result.rows.length) {
            res.status(404).send("Transaction not found");
        } else {
            await pool.query(queries.updateTransaction, [id, order_id, amount, currency, status, description, card]);
            res.send("Transaction updated successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(queries.getTransactionById, [id]);

        if (!result.rows.length) {
            res.status(404).send('Transaction not found');
        } else {
            await pool.query(queries.deleteTransaction, [id]);
            res.status(200).send('Transaction deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting transaction');
    }
};

module.exports = {
    passPayment,
    getTransactions,
    getTransactionById,
    getTransactionsByUserId,
    addTransaction,
    updateTransaction,
    deleteTransaction
};