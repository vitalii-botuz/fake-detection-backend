const jwt = require('jsonwebtoken');
const pool = require('../../../SecurityMail/database/dbConnection');
const queries = require('../../database/queries/UserQueries');
const { validateAddUser } = require('../functions/validation/user/userAddValidation')
const { validateUpdateUser } = require('../functions/validation/user/userUpdateValidation')
const { validatePhoneNumber } = require('../functions/phoneNumberValidation');
const { validateEmail } = require('../functions/mailValidation');


const getUsers = (req, res) => {
        pool.query(queries.getUsers, (error, response) => {
            if (error) throw error;
            const data = response.rows;
            const formattedData = JSON.stringify(data, null, 2);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(formattedData);
        });
};

const getUserById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = pool.query(queries.getUserById, [id]);
    result.then(result => {
        if (!result.rows.length) {
            res.send("User not found");
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


const getUserByEmail = (req, res) => {
    const email = req.params.email;

    pool.query(queries.checkEmailExists, [email])
        .then(result => {
            if (!result.rows.length) {
                res.status(404).json({ message: 'User not found' });
            } else {
                const user = result.rows[0];
                res.status(200).json(user);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        });
};

const registerUser = (req, res) => {
    const { email, username, password, avatar, status, first_name,
        last_name, age, gender, address, phone_number} = req.body;
    const result = pool.query(queries.checkEmailExists, [email]);
    const userValidation = validateAddUser(req.body, res);
    result.then(result => {
        if (!userValidation) {
            return;
        } else if (!validatePhoneNumber(phone_number)) {
            res.send("Phone number is not valid");
        } else if (!validateEmail(email)) {
            res.send("Email is not valid");
        } else if (result.rows.length) {
            res.send("Email already exists");
        } else {
            pool.query(queries.addUser, [email, username, password, avatar, status, first_name,
                last_name, age, gender, address, phone_number]);
            const token = jwt.sign({ email }, '12345', { expiresIn: '1h' });
            res.status(200).json({ token });
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send("Server error");
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    const userEmail = validateEmail(email);

    if (!userEmail) {
        res.send("Invalid Email");
    } else {
        pool.query(queries.loginUser, [email, password])
            .then(result => {
                if (!result.rows.length) {
                    res.send("Wrong password");
                } else {
                    const token = jwt.sign({ email }, '12345', { expiresIn: '1h' });
                    res.status(200).json({ token });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Server error");
            });
    }
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { email, username, password, avatar, status, first_name,
        last_name, age, gender, address, phone_number } = req.body;
    const result = pool.query(queries.getUserById, [id]);
    const userValidation = validateUpdateUser(req.body, res);
    result.then(result => {
        const noUserFound = !result.rows.length;
        if (!userValidation) {
            return;
        } else if (noUserFound) {
            res.send("User does not exist in the database");
        } else if (phone_number != null && !validatePhoneNumber(phone_number)) {
            res.send("Phone number is not valid");
        } else if (email != null && !validateEmail(email)) {
            res.send("Email is not valid");
        } else {
            pool.query(queries.updateUser, [ email, username, password, avatar, status, first_name,
                last_name, age, gender, address, phone_number, id]);
            res.send("User updated successfully");
        }
    });
};

const removeUser = (req, res) => {
    const id = parseInt(req.params.id);
    const result = pool.query(queries.getUserById, [id]);
    result.then(result => {
        const noUserFound = !result.rows.length;
        if (noUserFound) {
            res.send("User does not exist in the database");
        } else {
            pool.query(queries.removeUser, [id]);
            res.send("User removed successfully");
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send("Server error");
    });
};

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    removeUser,
    updateUser,
    getUserByEmail,
};