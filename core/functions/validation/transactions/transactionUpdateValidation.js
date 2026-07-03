const validator = require("card-validator");

const validateUpdateTransaction = (transaction, res) => {
    // const { order_id, amount, currency, status, description, card } = transaction;
    //
    // if (typeof order_id !== 'undefined' && typeof order_id !== 'number' && order_id <= 0) {
    //     res.send("Invalid order ID");
    //     return false;
    // }
    //
    // if (typeof amount !== 'undefined' && typeof amount !== 'number' && amount <= 0) {
    //     res.send("Invalid amount");
    //     return false;
    // }
    //
    // if (typeof currency !== 'undefined' && typeof currency !== 'string' && currency.length !== 3) {
    //     res.send("Invalid currency");
    //     return false;
    // }
    //
    // if (typeof status !== 'undefined' && typeof status !== 'string' && status.length === 0) {
    //     res.send("Invalid status");
    //     return false;
    // }
    //
    // if (typeof description !== 'undefined' && typeof description !== 'string' && description.length === 0) {
    //     res.send("Invalid description");
    //     return false;
    // }
    //
    // if (!validator.number(card)) {
    //     res.send("Invalid card number. Card number must be a valid credit card number.");
    //     return false;
    // }

    return true;
};

module.exports = {
    validateUpdateTransaction,
};
