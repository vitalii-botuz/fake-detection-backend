const pool = require('../../../SecurityMail/database/dbConnection');
const queries = require('../../database/queries/CheckQueries');
const axios = require('axios');
const {getUserById} = require('../../database/queries/UserQueries');
const {validateAddCheck} = require("../functions/validation/checks/checkAddValidation");
const {validateUpdateCheck} = require("../functions/validation/checks/checkUpdateValidation");

const passCheck = async (req, res) => {
    try {
        const {user_id, user_input} = req.body
        const response = await axios.post('http://127.0.0.1:3200/generate', {
            text: user_input
        });

        let processedResult = response.data.generated_text;
        const match = processedResult.match(/\[A\] (.*?)(?=\n|\[Q\])/);
        if (match) {
            processedResult = match[1].trim();
        } else {
            processedResult = "Could not process the answer.";
        }
        if (!validateAddCheck({ user_id, user_input, check_result: processedResult }, res)) {
            return;
        } else {
            await pool.query(queries.addCheck, [user_id, user_input, processedResult]);
        }
        res.status(200).json({ check_result: processedResult });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const getChecks = (req, res) => {
    pool.query(queries.getChecks, (error, response) => {
        if (error) throw error;
        const data = response.rows;
        const formattedData = JSON.stringify(data, null, 2);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(formattedData);
    });
};

const getCheckById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = pool.query(queries.getCheckById, [id]);
    result.then(result => {
        if (!result.rows.length) {
            res.send("Check not found");
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

const getChecksByUserId = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = pool.query(getUserById, [id]);
    result.then(async result => {
        if (!result.rows.length) {
            res.send("User not found");
        } else {
            const data = await pool.query(queries.getChecksByUserId, [id]);
            const formattedData = JSON.stringify(data.rows, null, 2);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(formattedData);
        }
    }).catch(err => {
        console.error(err);
        next(err);
    });
};

const addCheck = async (req, res) => {
    try {
        const { user_id, user_input, check_result } = req.body;
        const isUserExist = await pool.query(getUserById, [user_id])
        const checkValidation = validateAddCheck(req.body, res);
        if (!checkValidation) {
            return;
        }
        if(!isUserExist.rows.length) {
            res.send("No user found")
        } else {
            await pool.query(queries.addCheck, [user_id, user_input, check_result])
            res.send("Check was added successfully")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const updateCheck = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {user_input, check_result} = req.body;
        const result = await pool.query(queries.getCheckById, [id])
        const checkValidation = validateUpdateCheck(req.body, res);
        if (!checkValidation) {
            return;
        } else if (!result.rows.length) {
            res.send("No check found")
        } else {
            await pool.query(queries.updateCheck, [user_input, check_result, id])
            res.send("Check was updated successfully")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const removeCheck = (req, res) => {
    const id = parseInt(req.params.id);
    const result = pool.query(queries.getCheckById, [id])
    result.then(result => {
        if (!result.rows.length) {
            res.send("No check found")
        } else {
            pool.query(queries.removeCheck, [id])
            res.send("Check removed successfully");
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send("Server error");
    });
};

module.exports = {
    passCheck,
    getChecks,
    getCheckById,
    getCheckByUserId: getChecksByUserId,
    addCheck,
    updateCheck,
    removeCheck,
};