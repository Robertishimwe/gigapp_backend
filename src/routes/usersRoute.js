import express from "express";
import UserController from "../controllers/usersController";
import verify from "../middleware/authenticator";
const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.createUser);
router.get("/user", verify, UserController.findAllUsers);
router.get("/user/:id", verify, UserController.findOneUser);
router.get("/user/email/:email", verify, UserController.findUserByEmail);
router.get("/user/name/:name", verify, UserController.findUserByName);
router.put("/user/update/:id", verify, UserController.updateUser);
router.delete("/user/delete/:id", verify, UserController.deleteUser);
router.put("/user/:id/block", verify, UserController.blockUser);
router.put("/user/:id/unblock", verify, UserController.unblockUser);
router.put("/badges/:id/deletebadges", verify, UserController.deleteUserBadges);
router.get("/user/:role", verify, UserController.findUserByRole);
router.put("/user/:id/role", verify, UserController.assignRole);
router.put("/user/:id/badges", verify, UserController.assignBadge);

module.exports = router;
