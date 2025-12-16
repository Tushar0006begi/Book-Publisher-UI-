const express = require("express")
const router = express.Router()
const authorController = require("../controllers/authorController")
const multer = require("multer")

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/manuscripts/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
})

// Author routes
router.post("/register", authorController.registerAuthor)
router.post("/login", authorController.loginAuthor)
router.get("/profile/:authorId", authorController.getAuthorProfile)
router.put("/profile/:authorId", authorController.updateAuthorProfile)

// Manuscript submission routes
router.post("/submit", upload.single("manuscript"), authorController.submitManuscript)
router.get("/submissions/:authorId", authorController.getAuthorSubmissions)
router.get("/submission/:submissionId", authorController.getSubmissionDetails)

// Royalty routes
router.get("/royalties/:authorId", authorController.getAuthorRoyalties)
router.get("/sales/:authorId", authorController.getAuthorSales)

module.exports = router
