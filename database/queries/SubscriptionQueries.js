const getSubscriptions = "SELECT * FROM subscriptions";
const getSubscriptionById = "SELECT * FROM subscriptions WHERE id = $1";
const getSubscriptionsByUserId = "SELECT * FROM subscriptions WHERE user_id = $1";
const addSubscription = "INSERT INTO subscriptions (user_id, start_date, end_date) " +
    "VALUES ($1, $2, $3)";
const updateSubscription = "UPDATE subscriptions SET start_date = COALESCE($2, start_date), " +
    "end_date = COALESCE($3, end_date) WHERE id = $1";
const deleteSubscription = "DELETE FROM subscriptions WHERE id = $1";

module.exports = {
    getSubscriptions,
    getSubscriptionById,
    getSubscriptionsByUserId,
    addSubscription,
    updateSubscription,
    deleteSubscription
};