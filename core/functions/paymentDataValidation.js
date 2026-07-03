const validator = require("card-validator");

const paymentDataValidation = (req, res) => {
    const { amount, currency, description, card, card_exp_month, card_exp_year } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        res.send("Invalid amount.");
        return false;
    }

    if (typeof currency !== 'string' || currency.length !== 3) {
        res.send("Invalid currency. Currency must be exactly 3 characters long.");
        return false;
    }

    if (typeof description !== 'string' || description.trim().length === 0) {
        res.send("Invalid description. Description cannot be empty.");
        return false;
    }

    if (!validator.number(card)) {
        res.send("Invalid card number. Card number must be a valid credit card number.");
        console.log("card")
        return false;
    }

    if (!/^(0[1-9]|1[0-2])$/.test(card_exp_month)) {
        res.send("Invalid card expiration month. Must be in 'MM' format (01-12).");
        console.log("first date")
        return false;
    }

    if (!/^[0-9]{2}$/.test(card_exp_year)) {
        res.send("Invalid card expiration year. Must be in 'YY' format.");
        console.log("sec date")
        return false;
    }

    return true;
};

module.exports = {
    paymentDataValidation,
};