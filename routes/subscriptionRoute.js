const subscriptionController = require('../core/controllers/SubscriptionController')
const { Router } = require("express");

const router = Router();

router.get("/", subscriptionController.getSubscriptions);
router.get("/:id", subscriptionController.getSubscriptionById);
router.get("/user/:id", subscriptionController.getSubscriptionsByUserId);
router.post("/", subscriptionController.addSubscription);
router.put("/:id", subscriptionController.updateSubscription);
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;