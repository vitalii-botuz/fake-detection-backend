const controller = require('../../FakeDetection/core/controllers/TransactionController');
const { Router } = require("express");

const router = Router();

router.post("/pay/", controller.passPayment)
router.get("/", controller.getTransactions);
router.get("/:id", controller.getTransactionById);
router.get("/user/:id", controller.getTransactionsByUserId);
router.post("/", controller.addTransaction);
router.put("/:id", controller.updateTransaction);
router.delete("/:id", controller.deleteTransaction);

module.exports = router;