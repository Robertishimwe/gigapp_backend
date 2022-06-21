import express from "express";
import gigyController from "../controllers/gigyController";
import verify from "../middleware/authenticator";
import {
  checkEmployer,
  checkEmployee,
  checkAdimin,
} from "../middleware/roleBasedProtection";
const router = express.Router();

router.post("/gig/create", verify, checkEmployer, gigyController.createGig);
router.put("/gig/update/:id", verify, checkEmployer, gigyController.updateGig);
router.delete(
  "/gig/delete/:id",
  verify,
  checkEmployer,
  gigyController.deleteGig
);
router.get("/gig", gigyController.getAllGigs);
router.get("/gig/:id", gigyController.findGig);
router.get("/gig/user/:id", verify, gigyController.getGigsByUser);
router.get("/gig/status/:status", verify, gigyController.getGigsByStatus);
router.get("/gig/category/:category", verify, gigyController.getGigsByCategory);
router.patch("/gig/bid/:id", verify, checkEmployee, gigyController.applyBid);
router.patch(
  "/gig/:id/assignto/:userid",
  verify,
  checkEmployer,
  gigyController.assignGig
);
router.patch("/gig/:id/start", verify, checkEmployee, gigyController.startGig);
router.patch(
  "/gig/:id/complete",
  verify,
  checkEmployer,
  gigyController.completeGig
);

router.get("/gig/:id/bids", verify, gigyController.getBids);

module.exports = router;
