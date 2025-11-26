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
const FAQController = require("../../controllers/master_controller/FAQController.js");
const ProductController = require("../../controllers/master_controller/ProductController");
const MaterialController = require("../../controllers/master_controller/MaterialController");
const PortofolioController = require("../../controllers/master_controller/PortofolioController");
const BannerController = require("../../controllers/master_controller/BannerController.js");

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
router.post(
  "/category",
  upload.single("img"),
  CategoriesController.createCategory
);
router.put(
  "/category/:id",
  upload.single("img"),
  CategoriesController.updateCategory
);
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

// === FAQ ROUTES ===
router.get("/faqs", FAQController.getAllFAQ);
router.get("/faq/:id", FAQController.getFAQById);
router.post("/faq", FAQController.createFAQ);
router.put("/faq/:id", FAQController.updateFAQ);
router.delete("/faq/:id", FAQController.deleteFAQ);

// PRODUCT CRUD
router.get("/products", ProductController.getAllProduct);
router.get(
  "/products-by-catergories",
  ProductController.getAllProductByCategories
);
router.get("/product/:id", ProductController.getProductById);
router.post(
  "/product",
  upload.array("images", 5),
  ProductController.createProduct
);
router.put(
  "/product/:id",
  upload.array("images", 5),
  ProductController.updateProduct
);
router.delete("/product/:id", ProductController.deleteProduct);

// PRODUCT IMAGES
router.post(
  "/product/:id/images",
  upload.array("images", 10),
  ProductController.addProductImages
);
router.delete("/product/image/:imgId", ProductController.deleteProductImage);
router.put(
  "/product/:id/thumbnail/:imgId",
  ProductController.setProductThumbnail
);

// MATERIAL
router.get("/materials", MaterialController.getAllMaterial);
router.get("/material/:id", MaterialController.getMaterialById);
router.post("/material", MaterialController.createMaterial);
router.put("/material/:id", MaterialController.updateMaterial);
router.delete("/material/:id", MaterialController.deleteMaterial);

// === PORTFOLIO ROUTES ===
router.get("/portofolios", PortofolioController.getAllPortfolio);
router.get("/portofolio/:id", PortofolioController.getPortfolioById);
router.post(
  "/portofolio",
  upload.array("images", 10),
  PortofolioController.createPortfolio
);
router.put("/portofolio/:id", PortofolioController.updatePortfolio);
router.delete("/portofolio/:id", PortofolioController.deletePortfolio);
router.post(
  "/portofolio/:portofolioId/images",
  upload.array("images", 10),
  PortofolioController.addPortfolioImage
);
router.delete(
  "/portofolio/image/:imgId",
  PortofolioController.deletePortfolioImage
);

// === BANNER ===

router.get("/banners", BannerController.getAllBanner);
router.get("/banner/:id", BannerController.getBannerById);
router.post("/banner", upload.single("file"), BannerController.createBanner);
router.put("/banner/:id", upload.single("file"), BannerController.updateBanner);
router.delete("/banner/:id", BannerController.deleteBanner);
module.exports = router;
