const validateAddCheck = (check, res) => {
    // const { user_id, user_input, check_result } = check;
    //
    // if (typeof user_id !== 'number' || user_id <= 0) {
    //     res.send("Invalid user ID");
    //     return false;
    // }
    //
    // if (typeof user_input !== 'string' || user_input.length === 0) {
    //     res.send("Invalid user input");
    //     return false;
    // }
    //
    // if (typeof check_result !== 'string' || check_result.length === 0) {
    //     res.send("Invalid check result");
    //     return false;
    // }

    return true;
};

module.exports = {
    validateAddCheck,
};