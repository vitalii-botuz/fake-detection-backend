const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT * FROM users WHERE email = $1";
const addUser = "INSERT INTO users (email, username, password, avatar, status, first_name, " +
    "last_name, age, gender, address, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
const removeUser = "DELETE FROM users WHERE id = $1";
const updateUser = "UPDATE users SET email = COALESCE($1, email), " +
    "username = COALESCE($2, username), password = COALESCE($3, password), " +
    "avatar = COALESCE($4, avatar), status = COALESCE($5, status), first_name = COALESCE($6, first_name), " +
    "last_name = COALESCE($7, last_name), age = COALESCE($8, age), gender = COALESCE($9, gender), " +
    "address = COALESCE($10, address), phone_number = COALESCE($11, phone_number) WHERE id = $12";
const loginUser = "SELECT * FROM users WHERE email = $1 AND password = $2";

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    removeUser,
    updateUser,
    loginUser,
}