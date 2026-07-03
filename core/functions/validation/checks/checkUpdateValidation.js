const validateUpdateCheck = (check, res) => {
    // const { user_input, check_result } = check;
    //
    // if (typeof user_input !== 'undefined' && user_input !== null && (typeof user_input !== 'string' || user_input.length === 0)) {
    //     res.send("Invalid user input");
    //     return false;
    // }
    //
    // if (typeof check_result !== 'undefined' && check_result !== null && (typeof check_result !== 'string' || check_result.length === 0)) {
    //     res.send("Invalid check result");
    //     return false;
    // }

    return true;
};

module.exports = {
    validateUpdateCheck,
};