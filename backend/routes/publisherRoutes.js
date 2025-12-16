const express = require("express")
const router = express.Router()
const publisherController = require("../controllers/publisherController")

// Publisher authentication routes
router.post("/register", publisherController.registerPublisher)
router.post("/login", publisherController.loginPublisher)

// Submission management routes
router.get("/submissions", publisherController.getAllSubmissions)
router.get("/submission/:submissionId", publisherController.getSubmissionDetails)
router.put("/submission/:submissionId/status", publisherController.updateSubmissionStatus)
router.post("/submission/:submissionId/review", publisherController.addReview)

// Book management routes
router.get("/books", publisherController.getAllBooks)
router.post("/books", publisherController.addBook)
router.put("/books/:bookId", publisherController.updateBook)
router.delete("/books/:bookId", publisherController.deleteBook)

// Contract management routes
router.get("/contracts", publisherController.getAllContracts)
router.post("/contracts", publisherController.createContract)
router.put("/contracts/:contractId", publisherController.updateContract)
router.get("/contracts/:contractId", publisherController.getContractDetails)

// Analytics routes
router.get("/analytics/overview", publisherController.getAnalyticsOverview)
router.get("/analytics/sales", publisherController.getSalesAnalytics)

// Inventory routes
router.get("/inventory", publisherController.getInventory)
router.put("/inventory/:bookId", publisherController.updateInventory)

module.exports = router
