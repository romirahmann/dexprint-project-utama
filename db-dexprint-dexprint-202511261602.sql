-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dexprint
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `bannerId` int NOT NULL AUTO_INCREMENT,
  `page` enum('landingpage','product','portofolio','contact','about','custom') NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `imageUrl` text NOT NULL,
  `description` text,
  `isActive` tinyint(1) DEFAULT '1',
  `orderIndex` int DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bannerId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (6,'product','banner1-min.jpg','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143531/dexprint/1764143528935-banner1-min.jpg',NULL,1,0,'2025-11-26 07:52:11','2025-11-26 07:52:11'),(7,'portofolio','banner2-min.jpg','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143545/dexprint/1764143542793-banner2-min.jpg',NULL,1,0,'2025-11-26 07:52:25','2025-11-26 07:52:25'),(8,'contact','banner3-min.jpg','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143554/dexprint/1764143552463-banner3-min.jpg',NULL,1,0,'2025-11-26 07:52:35','2025-11-26 07:52:35');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (14,'Banner','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143291/dexprint/1764143289928-category_banner.jpg'),(15,'Display Promosi','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143309/dexprint/1764143307799-category_display%20promosi.jpg'),(16,'Office Stationary','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143323/dexprint/1764143321539-category_office.jpg'),(17,'Marketing Kits','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143337/dexprint/1764143336022-category_marketing.jpg'),(18,'Souvenir/Merchandise','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143368/dexprint/1764143366617-category_souvenir.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `clientId` int NOT NULL AUTO_INCREMENT,
  `clientName` varchar(100) DEFAULT NULL,
  `clientLogo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (16,'dexprint','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143922/dexprint/1764143920826-logo%20dexprint%20orange.png','2025-11-26 07:58:42','2025-11-26 07:58:42'),(17,'AWALAN','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143947/dexprint/1764143946340-AWALAN.jpg','2025-11-26 07:59:07','2025-11-26 07:59:07'),(18,'Ryehana','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143994/dexprint/1764143992844-1003772176.jpg','2025-11-26 07:59:55','2025-11-26 07:59:55'),(19,'GRANTIK','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764144024/dexprint/1764144022115-grantik.png','2025-11-26 08:00:24','2025-11-26 08:00:24');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyprofile`
--

DROP TABLE IF EXISTS `companyprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyprofile` (
  `profileId` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(100) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `established` date DEFAULT NULL,
  `websiteName` varchar(255) DEFAULT NULL,
  `employees` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `vision` varchar(255) DEFAULT NULL,
  `mission` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`profileId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyprofile`
--

LOCK TABLES `companyprofile` WRITE;
/*!40000 ALTER TABLE `companyprofile` DISABLE KEYS */;
INSERT INTO `companyprofile` VALUES (1,'dexprint','85899310781','dexprint@gmail.com','2025-10-27','dexprint.com',200,'Karawang, Jawa Barat','Dexprint berdiri sejak tahun 2007 di Karawang Jawa Barat dengan fokus bisnis di bidang jasa layanan cetak kebutuhan perusahaan, instansi, sekolah, komunitas, UMKM, personal, dll. Terus tumbuh dan berkembang, lebih dari 10 tahun perjalanan mengantarkan Dexprint menjadi perusahaan jasa cetak terkemuka di Karawang dengan jangkauan layanan seluruh indonesia. Komitmen kami tanpa kompromi untuk menjadi mitra/vendor kbutuhan cetak yang dapat diandalkan. Mengedepankan pelayanan prima yang selalu siap sedia memenuhi kebutuhan cetak dengan produksi terbaik.','1. Menjadi perusahaan andalan solusi kebutuhan cetak\n2. Menjadi perusahaan yang mampu memberikan pengalaman mencetak\n3. Menjadi perusahaan yang senantiasa bertumbuh, berkembang, dan memberikan seluas-luasnya manfaat.','1. Menjalin hubungan baik dengan konsumen secara berkelanjutan.\n2. Selalu menjadi andalan yang siap sedia saat dibutuhkan.\n3. Berorientasi kepada kepuasan konsumen dan berkomitmen untuk senantiasa memberikan pelayanan dan produk terbaik.\n4. Memberikan sebesar-besarnya manfaat untuk konsumen.\n5. Senantiasa berinovasi dalam pengembangan produk dan layanan.');
/*!40000 ALTER TABLE `companyprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `faqId` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `orderIndex` int DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`faqId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'Apa itu Dexprint?','Dexprint adalah perusahaan percetakan profesional di Karawang yang melayani kebutuhan cetak digital maupun offset dengan kualitas tinggi dan harga kompetitif.',1,1,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(2,'Layanan apa saja yang disediakan oleh Dexprint?','Kami melayani berbagai kebutuhan cetak seperti banner, brosur, kemasan produk, label stiker, kartu nama, hingga merchandise custom.',1,2,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(3,'Apakah Dexprint melayani pemesanan dalam jumlah kecil?','Ya, kami menerima pesanan dalam jumlah kecil (print-on-demand) maupun besar dengan hasil yang tetap berkualitas.',1,3,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(4,'Apakah Dexprint menyediakan jasa desain grafis?','Tentu. Tim desain kami siap membantu membuat desain yang sesuai kebutuhan branding dan produk Anda sebelum proses cetak.',1,4,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(5,'Berapa lama waktu produksi di Dexprint?','Waktu produksi tergantung jenis produk dan jumlah pesanan. Untuk cetak digital biasanya 1–2 hari kerja, sedangkan offset 3–5 hari kerja.',1,5,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(6,'Apakah Dexprint menerima pengiriman ke luar Karawang?','Ya, kami melayani pengiriman ke seluruh Indonesia menggunakan jasa ekspedisi terpercaya.',1,6,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(7,'Bagaimana cara melakukan pemesanan di Dexprint?','Pemesanan bisa dilakukan langsung di kantor kami di Karawang atau secara online melalui WhatsApp, email, maupun media sosial Dexprint.',1,7,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(8,'Apakah ada layanan prioritas atau express printing?','Kami menyediakan layanan express untuk kebutuhan cetak mendesak dengan waktu pengerjaan lebih cepat tanpa mengurangi kualitas hasil.',1,8,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(9,'Apakah Dexprint menerima kerja sama perusahaan atau vendor?','Ya, kami terbuka untuk kerja sama dengan perusahaan, instansi, dan agency dalam bentuk proyek cetak jangka panjang atau kemitraan vendor.',1,9,'2025-11-10 02:45:18','2025-11-10 02:45:18'),(10,'Di mana lokasi Dexprint?','Kantor dan workshop kami berlokasi di Karawang, Jawa Barat. Untuk alamat lengkap dan rute, silakan kunjungi halaman kontak di website Dexprint.',1,10,'2025-11-10 02:45:18','2025-11-10 02:45:18');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_banner`
--

DROP TABLE IF EXISTS `hero_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_banner` (
  `bannerId` int NOT NULL AUTO_INCREMENT,
  `note` varchar(100) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `type` enum('landingpage','katalog') DEFAULT 'landingpage',
  PRIMARY KEY (`bannerId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_banner`
--

LOCK TABLES `hero_banner` WRITE;
/*!40000 ALTER TABLE `hero_banner` DISABLE KEYS */;
INSERT INTO `hero_banner` VALUES (19,'banner1-min.jpg','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143493/dexprint/1764143490282-banner1-min.jpg','landingpage'),(20,'banner2-min.jpg','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143495/dexprint/1764143492296-banner2-min.jpg','landingpage'),(21,'banner3-min.jpg','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143495/dexprint/1764143494693-banner3-min.jpg','landingpage');
/*!40000 ALTER TABLE `hero_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `materialId` int NOT NULL AUTO_INCREMENT,
  `materialName` varchar(255) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`materialId`),
  KEY `materials_products_FK` (`productId`),
  CONSTRAINT `materials_products_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portofolio`
--

DROP TABLE IF EXISTS `portofolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portofolio` (
  `portofolioId` int NOT NULL AUTO_INCREMENT,
  `portoName` varchar(100) DEFAULT NULL,
  `portoDesc` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `productId` int DEFAULT NULL,
  `doDate` date DEFAULT NULL,
  `client` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`portofolioId`),
  KEY `portofolio_products_FK` (`productId`),
  CONSTRAINT `portofolio_products_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portofolio`
--

LOCK TABLES `portofolio` WRITE;
/*!40000 ALTER TABLE `portofolio` DISABLE KEYS */;
INSERT INTO `portofolio` VALUES (2,'Coffee Maker','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit','2025-11-26 15:17:03','2025-11-26 15:17:03',12,'2025-11-01','AWALAN COFFEE');
/*!40000 ALTER TABLE `portofolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portofolio_img`
--

DROP TABLE IF EXISTS `portofolio_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portofolio_img` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` text,
  `note` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `portofolioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `portofolio_img_portofolio_FK` (`portofolioId`),
  CONSTRAINT `portofolio_img_portofolio_FK` FOREIGN KEY (`portofolioId`) REFERENCES `portofolio` (`portofolioId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portofolio_img`
--

LOCK TABLES `portofolio_img` WRITE;
/*!40000 ALTER TABLE `portofolio_img` DISABLE KEYS */;
INSERT INTO `portofolio_img` VALUES (3,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764145020/dexprint/1764145017593-SUSU%20SODA%20MENTAH.png','Coffee Maker','2025-11-26 15:17:03',NULL),(4,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764145022/dexprint/1764145019766-lechyee%20mentah.png','Coffee Maker','2025-11-26 15:17:03',NULL),(5,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764145022/dexprint/1764145021938-lemon%20tea%20mentah.png','Coffee Maker','2025-11-26 15:17:03',NULL);
/*!40000 ALTER TABLE `portofolio_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_img`
--

DROP TABLE IF EXISTS `product_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_img` (
  `imgId` int NOT NULL AUTO_INCREMENT,
  `url` text,
  `note` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `isthumbnail` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`imgId`),
  KEY `product_img_products_FK` (`productId`),
  CONSTRAINT `product_img_products_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_img`
--

LOCK TABLES `product_img` WRITE;
/*!40000 ALTER TABLE `product_img` DISABLE KEYS */;
INSERT INTO `product_img` VALUES (40,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764144157/dexprint/1764144155705-aren.png','Kopsu Aren',12,0),(41,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764144220/dexprint/1764144218491-HOT%20Latte.png','Latte',13,0),(42,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764144292/dexprint/1764144289395-Gemini_Generated_Image_kvd3irkvd3irkvd3.png','Caramel Matchiato',14,0),(43,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764144337/dexprint/1764144334678-cheesecuit%20oreo.png','Cheescuit',15,0),(44,'https://res.cloudinary.com/dmedjs0rb/image/upload/v1764144367/dexprint/1764144364699-Dirty%20Late.png','Dirty Latte',16,0);
/*!40000 ALTER TABLE `product_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_videos`
--

DROP TABLE IF EXISTS `product_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_videos` (
  `videoUrl` text,
  `videoNote` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `videoId` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`videoId`),
  KEY `product_videos_products_FK` (`productId`),
  CONSTRAINT `product_videos_products_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_videos`
--

LOCK TABLES `product_videos` WRITE;
/*!40000 ALTER TABLE `product_videos` DISABLE KEYS */;
INSERT INTO `product_videos` VALUES ('https://www.youtube.com/embed/Rmu4mu2V-GQ',NULL,12,11),('https://www.youtube.com/embed/Rmu4mu2V-GQ',NULL,13,12),('https://www.youtube.com/embed/Rmu4mu2V-GQ',NULL,14,13),('https://www.youtube.com/embed/Rmu4mu2V-GQ',NULL,15,14),('https://www.youtube.com/embed/Rmu4mu2V-GQ',NULL,16,15);
/*!40000 ALTER TABLE `product_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) DEFAULT NULL,
  `categoryId` int NOT NULL,
  `description` text,
  `minprice` int DEFAULT '0',
  `isThumbnail` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`productId`),
  KEY `products_categories_FK` (`categoryId`),
  CONSTRAINT `products_categories_FK` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (12,'Kopsu Aren',18,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',15000,0),(13,'Latte',17,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',15000,0),(14,'Caramel Matchiato',16,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',18000,0),(15,'Cheescuit',15,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',18000,0),(16,'Dirty Latte',14,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',20000,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `feedback` text,
  `fileIMG` varchar(100) DEFAULT NULL,
  `tenant` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`reviewId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (9,'Romi Rahman','Hasil cetakannya luar biasa, warna akurat dan kualitas kertas premium. Proses cepat dan timnya sangat responsif. Recommended banget!','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143655/dexprint/1764143654174-PP.jpg','Awalan Coffee'),(10,'MANNN','Saya pesan brosur untuk event kantor, dan hasilnya melebihi ekspektasi. Desain saya diperhatikan detailnya, dan pengiriman tepat waktu','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143702/dexprint/1764143700182-PP-2.jpg','PT Padama Bahtera Labelindo'),(11,'Tatang','Cetakan kalender dan poster untuk brand kami sangat profesional. Warna tajam, kertas tebal, dan finishing rapi. Sangat membantu promosi kami.','https://res.cloudinary.com/dmedjs0rb/image/upload/v1764143867/dexprint/1764143866156-man.jpg','PT Awalan Creative');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `serviceId` int NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`serviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(100) DEFAULT NULL,
  `roleDesc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'DEVELOPER','Awalan Creative Agency'),(2,'ADMIN','User Admin untuk dexprint'),(3,'USER','User Biasa');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `users_unique` (`username`),
  KEY `users_user_roles_FK` (`roleId`),
  CONSTRAINT `users_user_roles_FK` FOREIGN KEY (`roleId`) REFERENCES `user_roles` (`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'admin','$argon2id$v=19$m=65536,t=4,p=2$hRxzPVzMxyDmzhIK+X5I5A$Nou0IqaDYpr/ymoUCHS2ZGKxP+LHtdH/5E+g9+Nu7mc',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dexprint'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 16:02:19
