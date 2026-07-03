const getTransactions = "SELECT * FROM transactions";
const getTransactionById = "SELECT * FROM transactions WHERE id = $1";
const getTransactionsByUserId = "SELECT * FROM transactions WHERE user_id = $1";
const addTransaction = "INSERT INTO transactions (user_id, order_id, amount, currency, status, description, card) " +
    "VALUES ($1, $2, $3, $4, $5, $6, $7)";
const updateTransaction = "UPDATE transactions SET order_id = COALESCE($2, order_id)," +
    " amount = COALESCE($3, amount), currency = COALESCE($4, currency), status = COALESCE($5, status), " +
    "description = COALESCE($6, description), card = COALESCE($7, card) WHERE id = $1";
const deleteTransaction = "DELETE FROM transactions WHERE id = $1";
const getLastOrderId = "SELECT order_id FROM transactions ORDER BY id DESC LIMIT 1;"

module.exports = {
    getTransactions,
    getTransactionById,
    getTransactionsByUserId,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getLastOrderId,
};