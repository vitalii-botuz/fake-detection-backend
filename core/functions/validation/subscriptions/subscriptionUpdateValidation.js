const validateUpdateSubscription = (subscription, res) => {
    // const { start_date, end_date } = subscription;
    //
    // if (start_date && !(start_date instanceof Date && !isNaN(start_date.getTime()))) {
    //     res.send("Invalid start date");
    //     return false;
    // }
    //
    // if (end_date && !(end_date instanceof Date && !isNaN(end_date.getTime()))) {
    //     res.send("Invalid end date");
    //     return false;
    // }

    return true;
};

module.exports = {
    validateUpdateSubscription,
};
