const getChecks = "SELECT * FROM checks";
const getCheckById = "SELECT * FROM checks WHERE id = $1";
const getChecksByUserId = "SELECT * FROM checks WHERE user_id = $1";
const addCheck = "INSERT INTO checks (user_id, user_input, check_result) VALUES ($1, $2, $3)";
const removeCheck = "DELETE FROM checks WHERE id = $1";
const updateCheck = "UPDATE checks SET user_input = COALESCE($1, user_input), " +
    "check_result = COALESCE($2, check_result) WHERE id = $3";

module.exports = {
    getChecks,
    getCheckById,
    getChecksByUserId,
    addCheck,
    removeCheck,
    updateCheck,
};