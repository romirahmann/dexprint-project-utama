var express = require("express");
var router = express.Router();
const upload = require("../../services/upload.service.js");

// CONTROLLER
const UserController = require("../../controllers/master_controller/UserController");
const ProfileController = require("../../controllers/master_controller/ProfileController");
const CategoriesController = require("../../controllers/master_controller/CategoriesController");
const ClientController = require("../../controllers/master_controller/ClientController");
const HeroController = require("../../controllers/master_controller/HeroController");
const ReviewController = require("../../controllers/master_controller/ReviewController.js");

// USER ROUTES
router.get("/users", UserController.getAllUser);
router.get("/user/:id", UserController.getUserByID);
router.post("/user", UserController.register);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deletedUser);

// COMPANY PROFILE
router.get("/profile", ProfileController.getAllCompany);
router.get("/profile/:id", ProfileController.getCompanyById);
router.post("/profile", ProfileController.createCompany);
router.put("/profile/:id", ProfileController.updateCompany);
router.delete("/profile/:id", ProfileController.deleteCompany);

// === CATEGORY ROUTES ===
router.get("/categories", CategoriesController.getAllCategory);
router.get("/category/:id", CategoriesController.getCategoryById);
router.post("/category", CategoriesController.createCategory);
router.put("/category/:id", CategoriesController.updateCategory);
router.delete("/category/:id", CategoriesController.deleteCategory);

// CLIENTS
router.get("/clients", ClientController.getAllClient);
router.get("/client/:id", ClientController.getClientById);
router.post("/client", upload.single("logo"), ClientController.createClient);
router.put("/client/:id", upload.single("logo"), ClientController.updateClient);
router.delete("/client/:id", ClientController.deleteClient);

// === HERO ROUTES ===
router.get("/heros", HeroController.getAllHero);
router.get("/hero/:id", HeroController.getHeroById);
router.post("/hero", upload.array("files", 10), HeroController.createHero);
router.put("/hero/:id", upload.single("file"), HeroController.updateHero);
router.delete("/hero/:id", HeroController.deleteHero);

// === REVIEW ROUTES ===
router.get("/reviews", ReviewController.getAllReview);
router.get("/review/:id", ReviewController.getReviewById);
router.post("/review", upload.single("file"), ReviewController.createReview);
router.put("/review/:id", upload.single("file"), ReviewController.updateReview);
router.delete("/review/:id", ReviewController.deleteReview);

module.exports = router;
