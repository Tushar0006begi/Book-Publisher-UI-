const db = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register publisher
exports.registerPublisher = async (req, res) => {
  try {
    const { name, email, password, company_name } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await db.query(
      "INSERT INTO publishers (name, email, password, company_name) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, company_name],
    )

    res.status(201).json({
      success: true,
      message: "Publisher registered successfully",
      publisherId: result.insertId,
    })
  } catch (error) {
    console.error("Error registering publisher:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Login publisher
exports.loginPublisher = async (req, res) => {
  try {
    const { email, password } = req.body

    const [publishers] = await db.query("SELECT * FROM publishers WHERE email = ?", [email])

    if (publishers.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const publisher = publishers[0]
    const isValid = await bcrypt.compare(password, publisher.password)

    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: publisher.id, email: publisher.email }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.json({
      success: true,
      token,
      publisher: {
        id: publisher.id,
        name: publisher.name,
        email: publisher.email,
        company_name: publisher.company_name,
      },
    })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const { status, genre, sortBy = "submission_date", order = "DESC" } = req.query

    let query = `
      SELECT s.*, a.name as author_name, a.email as author_email,
        (SELECT COUNT(*) FROM submission_reviews WHERE submission_id = s.id) as review_count
      FROM submissions s
      JOIN authors a ON s.author_id = a.id
      WHERE 1=1
    `
    const params = []

    if (status) {
      query += " AND s.status = ?"
      params.push(status)
    }

    if (genre) {
      query += " AND s.genre = ?"
      params.push(genre)
    }

    query += ` ORDER BY s.${sortBy} ${order}`

    const [submissions] = await db.query(query, params)

    res.json({ success: true, submissions })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get submission details
exports.getSubmissionDetails = async (req, res) => {
  try {
    const { submissionId } = req.params

    const [submissions] = await db.query(
      `SELECT s.*, a.name as author_name, a.email as author_email, a.bio as author_bio
       FROM submissions s
       JOIN authors a ON s.author_id = a.id
       WHERE s.id = ?`,
      [submissionId],
    )

    if (submissions.length === 0) {
      return res.status(404).json({ success: false, message: "Submission not found" })
    }

    const [reviews] = await db.query(
      "SELECT * FROM submission_reviews WHERE submission_id = ? ORDER BY review_date DESC",
      [submissionId],
    )

    res.json({
      success: true,
      submission: submissions[0],
      reviews,
    })
  } catch (error) {
    console.error("Error fetching submission details:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update submission status
exports.updateSubmissionStatus = async (req, res) => {
  try {
    const { submissionId } = req.params
    const { status, notes } = req.body

    await db.query("UPDATE submissions SET status = ?, status_notes = ?, updated_at = NOW() WHERE id = ?", [
      status,
      notes,
      submissionId,
    ])

    res.json({ success: true, message: "Submission status updated successfully" })
  } catch (error) {
    console.error("Error updating submission status:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Add review to submission
exports.addReview = async (req, res) => {
  try {
    const { submissionId } = req.params
    const { reviewer_name, rating, comments } = req.body

    const [result] = await db.query(
      "INSERT INTO submission_reviews (submission_id, reviewer_name, rating, comments, review_date) VALUES (?, ?, ?, ?, NOW())",
      [submissionId, reviewer_name, rating, comments],
    )

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      reviewId: result.insertId,
    })
  } catch (error) {
    console.error("Error adding review:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const [books] = await db.query(
      `SELECT b.*, a.name as author_name
       FROM books b
       JOIN authors a ON b.author_id = a.id
       ORDER BY b.published_date DESC`,
    )

    res.json({ success: true, books })
  } catch (error) {
    console.error("Error fetching books:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Add book
exports.addBook = async (req, res) => {
  try {
    const { authorId, title, genre, description, price, isbn, publishedDate } = req.body

    const [result] = await db.query(
      `INSERT INTO books (author_id, title, genre, description, price, isbn, published_date, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'active')`,
      [authorId, title, genre, description, price, isbn, publishedDate],
    )

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      bookId: result.insertId,
    })
  } catch (error) {
    console.error("Error adding book:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params
    const { title, description, price, status } = req.body

    await db.query("UPDATE books SET title = ?, description = ?, price = ?, status = ? WHERE id = ?", [
      title,
      description,
      price,
      status,
      bookId,
    ])

    res.json({ success: true, message: "Book updated successfully" })
  } catch (error) {
    console.error("Error updating book:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params

    await db.query("DELETE FROM books WHERE id = ?", [bookId])

    res.json({ success: true, message: "Book deleted successfully" })
  } catch (error) {
    console.error("Error deleting book:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get all contracts
exports.getAllContracts = async (req, res) => {
  try {
    const [contracts] = await db.query(
      `SELECT c.*, a.name as author_name, b.title as book_title
       FROM contracts c
       JOIN authors a ON c.author_id = a.id
       JOIN books b ON c.book_id = b.id
       ORDER BY c.contract_date DESC`,
    )

    res.json({ success: true, contracts })
  } catch (error) {
    console.error("Error fetching contracts:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Create contract
exports.createContract = async (req, res) => {
  try {
    const { authorId, bookId, royaltyPercentage, advance, terms, startDate, endDate } = req.body

    const [result] = await db.query(
      `INSERT INTO contracts (author_id, book_id, royalty_percentage, advance, terms, start_date, end_date, contract_date, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'active')`,
      [authorId, bookId, royaltyPercentage, advance, terms, startDate, endDate],
    )

    res.status(201).json({
      success: true,
      message: "Contract created successfully",
      contractId: result.insertId,
    })
  } catch (error) {
    console.error("Error creating contract:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update contract
exports.updateContract = async (req, res) => {
  try {
    const { contractId } = req.params
    const { royaltyPercentage, terms, status } = req.body

    await db.query("UPDATE contracts SET royalty_percentage = ?, terms = ?, status = ? WHERE id = ?", [
      royaltyPercentage,
      terms,
      status,
      contractId,
    ])

    res.json({ success: true, message: "Contract updated successfully" })
  } catch (error) {
    console.error("Error updating contract:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get contract details
exports.getContractDetails = async (req, res) => {
  try {
    const { contractId } = req.params

    const [contracts] = await db.query(
      `SELECT c.*, a.name as author_name, a.email as author_email, b.title as book_title
       FROM contracts c
       JOIN authors a ON c.author_id = a.id
       JOIN books b ON c.book_id = b.id
       WHERE c.id = ?`,
      [contractId],
    )

    if (contracts.length === 0) {
      return res.status(404).json({ success: false, message: "Contract not found" })
    }

    res.json({ success: true, contract: contracts[0] })
  } catch (error) {
    console.error("Error fetching contract details:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get analytics overview
exports.getAnalyticsOverview = async (req, res) => {
  try {
    const [stats] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM submissions WHERE status = 'pending') as pending_submissions,
        (SELECT COUNT(*) FROM books WHERE status = 'active') as active_books,
        (SELECT COUNT(*) FROM contracts WHERE status = 'active') as active_contracts,
        (SELECT COALESCE(SUM(quantity), 0) FROM sales WHERE MONTH(sale_date) = MONTH(CURRENT_DATE())) as monthly_sales,
        (SELECT COALESCE(SUM(amount), 0) FROM sales WHERE MONTH(sale_date) = MONTH(CURRENT_DATE())) as monthly_revenue
    `)

    res.json({ success: true, stats: stats[0] })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get sales analytics
exports.getSalesAnalytics = async (req, res) => {
  try {
    const [salesByMonth] = await db.query(`
      SELECT 
        DATE_FORMAT(sale_date, '%Y-%m') as month,
        SUM(quantity) as total_sales,
        SUM(amount) as total_revenue
      FROM sales
      WHERE sale_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(sale_date, '%Y-%m')
      ORDER BY month DESC
    `)

    const [topBooks] = await db.query(`
      SELECT b.title, b.genre, SUM(s.quantity) as total_sold, SUM(s.amount) as revenue
      FROM sales s
      JOIN books b ON s.book_id = b.id
      GROUP BY s.book_id
      ORDER BY total_sold DESC
      LIMIT 10
    `)

    res.json({
      success: true,
      salesByMonth,
      topBooks,
    })
  } catch (error) {
    console.error("Error fetching sales analytics:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get inventory
exports.getInventory = async (req, res) => {
  try {
    const [inventory] = await db.query(`
      SELECT i.*, b.title, b.genre, a.name as author_name
      FROM inventory i
      JOIN books b ON i.book_id = b.id
      JOIN authors a ON b.author_id = a.id
      ORDER BY i.last_updated DESC
    `)

    res.json({ success: true, inventory })
  } catch (error) {
    console.error("Error fetching inventory:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update inventory
exports.updateInventory = async (req, res) => {
  try {
    const { bookId } = req.params
    const { physical_stock, digital_available, print_on_demand } = req.body

    // Check if inventory record exists
    const [existing] = await db.query("SELECT id FROM inventory WHERE book_id = ?", [bookId])

    if (existing.length > 0) {
      await db.query(
        "UPDATE inventory SET physical_stock = ?, digital_available = ?, print_on_demand = ?, last_updated = NOW() WHERE book_id = ?",
        [physical_stock, digital_available, print_on_demand, bookId],
      )
    } else {
      await db.query(
        "INSERT INTO inventory (book_id, physical_stock, digital_available, print_on_demand, last_updated) VALUES (?, ?, ?, ?, NOW())",
        [bookId, physical_stock, digital_available, print_on_demand],
      )
    }

    res.json({ success: true, message: "Inventory updated successfully" })
  } catch (error) {
    console.error("Error updating inventory:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}
