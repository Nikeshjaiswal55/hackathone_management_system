const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathon.controller");
const { protect } = require("../../../middleware/auth.middleware");

router.post("/hackathons", protect, hackathonController.createHackathon);
router.get("/hackathons", hackathonController.getHackathons);
router.get("/hackathons/:id", protect, hackathonController.getHackathonById);
router.get(
  "/hackathon/userId",
  protect,
  hackathonController.getHackathonsByUserId
);

router.get(
  "/register-hackathon/userId",
  protect,
  hackathonController.getRegisteredHackathonsByUserId
);

router.put("/hackathons/:id", protect, hackathonController.updateHackathon);
router.delete("/hackathons/:id", protect, hackathonController.deleteHackathon);
router.post(
  "/hackathons/:id/register",
  protect,
  hackathonController.registerForHackathon
);

module.exports = router;
