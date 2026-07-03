const controller = require('../core/controllers/CheckController');
const { Router } = require("express");

const router = Router();

router.post("/pass-input/", controller.passCheck)
router.get("/", controller.getChecks);
router.get("/:id", controller.getCheckById);
router.get("/user/:id", controller.getCheckByUserId);
router.post("/", controller.addCheck);
router.put("/:id", controller.updateCheck);
router.delete("/:id", controller.removeCheck);

module.exports = router;