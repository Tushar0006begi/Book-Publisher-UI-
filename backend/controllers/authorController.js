const db = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register author
exports.registerAuthor = async (req, res) => {
  try {
    const { name, email, password, bio, location, genres } = req.body

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await db.query(
      "INSERT INTO authors (name, email, password, bio, location, genres) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, bio, location, genres],
    )

    res.status(201).json({
      success: true,
      message: "Author registered successfully",
      authorId: result.insertId,
    })
  } catch (error) {
    console.error("Error registering author:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Login author
exports.loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body

    const [authors] = await db.query("SELECT * FROM authors WHERE email = ?", [email])

    if (authors.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const author = authors[0]
    const isValid = await bcrypt.compare(password, author.password)

    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: author.id, email: author.email }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.json({
      success: true,
      token,
      author: {
        id: author.id,
        name: author.name,
        email: author.email,
        bio: author.bio,
      },
    })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get author profile
exports.getAuthorProfile = async (req, res) => {
  try {
    const { authorId } = req.params

    const [authors] = await db.query(
      "SELECT id, name, email, bio, location, genres, website, created_at FROM authors WHERE id = ?",
      [authorId],
    )

    if (authors.length === 0) {
      return res.status(404).json({ success: false, message: "Author not found" })
    }

    res.json({ success: true, author: authors[0] })
  } catch (error) {
    console.error("Error fetching author profile:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update author profile
exports.updateAuthorProfile = async (req, res) => {
  try {
    const { authorId } = req.params
    const { name, bio, location, genres, website } = req.body

    await db.query("UPDATE authors SET name = ?, bio = ?, location = ?, genres = ?, website = ? WHERE id = ?", [
      name,
      bio,
      location,
      genres,
      website,
      authorId,
    ])

    res.json({ success: true, message: "Profile updated successfully" })
  } catch (error) {
    console.error("Error updating profile:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Submit manuscript
exports.submitManuscript = async (req, res) => {
  try {
    const { authorId, title, genre, synopsis, wordCount, targetAudience } = req.body
    const manuscriptFile = req.file ? req.file.filename : null

    const [result] = await db.query(
      `INSERT INTO submissions 
       (author_id, title, genre, synopsis, word_count, target_audience, manuscript_file, status, submission_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [authorId, title, genre, synopsis, wordCount, targetAudience, manuscriptFile],
    )

    res.status(201).json({
      success: true,
      message: "Manuscript submitted successfully",
      submissionId: result.insertId,
    })
  } catch (error) {
    console.error("Error submitting manuscript:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get author submissions
exports.getAuthorSubmissions = async (req, res) => {
  try {
    const { authorId } = req.params

    const [submissions] = await db.query(
      `SELECT s.*, 
        (SELECT COUNT(*) FROM submission_reviews WHERE submission_id = s.id) as review_count
       FROM submissions s
       WHERE s.author_id = ?
       ORDER BY s.submission_date DESC`,
      [authorId],
    )

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
      "SELECT s.*, a.name as author_name FROM submissions s JOIN authors a ON s.author_id = a.id WHERE s.id = ?",
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

// Get author royalties
exports.getAuthorRoyalties = async (req, res) => {
  try {
    const { authorId } = req.params

    const [royalties] = await db.query(
      `SELECT r.*, b.title as book_title
       FROM royalties r
       JOIN books b ON r.book_id = b.id
       WHERE r.author_id = ?
       ORDER BY r.payment_date DESC`,
      [authorId],
    )

    const [summary] = await db.query(
      `SELECT 
        SUM(amount) as total_earned,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as paid
       FROM royalties
       WHERE author_id = ?`,
      [authorId],
    )

    res.json({
      success: true,
      royalties,
      summary: summary[0],
    })
  } catch (error) {
    console.error("Error fetching royalties:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get author sales
exports.getAuthorSales = async (req, res) => {
  try {
    const { authorId } = req.params

    const [sales] = await db.query(
      `SELECT s.*, b.title as book_title
       FROM sales s
       JOIN books b ON s.book_id = b.id
       WHERE b.author_id = ?
       ORDER BY s.sale_date DESC
       LIMIT 100`,
      [authorId],
    )

    res.json({ success: true, sales })
  } catch (error) {
    console.error("Error fetching sales:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}
