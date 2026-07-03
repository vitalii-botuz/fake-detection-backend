const controller = require('../../FakeDetection/core/controllers/UserController');
const {Router, response} = require("express");

const router = Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.registerUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.removeUser);
router.get("/:mail", controller.getUserByEmail);
router.get('/email/:email', controller.getUserByEmail);

module.exports = router;