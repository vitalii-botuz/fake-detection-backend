const validator = require("card-validator");

const validateAddTransaction = (transaction, res) => {
    // const { user_id, order_id, amount, currency, status, description, card } = transaction;
    //
    // if (typeof user_id !== 'number' || user_id <= 0) {
    //     res.send("Invalid user ID");
    //     return false;
    // }
    //
    // if (typeof order_id !== 'number' || order_id <= 0) {
    //     res.send("Invalid order ID");
    //     return false;
    // }
    //
    // if (typeof amount !== 'number' || amount <= 0) {
    //     res.send("Invalid amount");
    //     return false;
    // }
    //
    // if (typeof currency !== 'string' || currency.length !== 3) {
    //     res.send("Invalid currency");
    //     return false;
    // }
    //
    // if (typeof status !== 'string' || status.length === 0) {
    //     res.send("Invalid status");
    //     return false;
    // }
    //
    // if (typeof description !== 'string' || description.length === 0) {
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
    validateAddTransaction,
};