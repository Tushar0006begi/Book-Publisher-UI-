-- Create database
CREATE DATABASE IF NOT EXISTS book_platform;
USE book_platform;

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  location VARCHAR(255),
  genres VARCHAR(500),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Publishers table
CREATE TABLE IF NOT EXISTS publishers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  genre VARCHAR(100),
  synopsis TEXT,
  word_count INT,
  target_audience VARCHAR(255),
  manuscript_file VARCHAR(500),
  status ENUM('pending', 'under_review', 'accepted', 'rejected', 'published') DEFAULT 'pending',
  status_notes TEXT,
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
  INDEX idx_author_id (author_id),
  INDEX idx_status (status),
  INDEX idx_submission_date (submission_date)
);

-- Submission reviews table
CREATE TABLE IF NOT EXISTS submission_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id INT NOT NULL,
  reviewer_name VARCHAR(255),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
  INDEX idx_submission_id (submission_id)
);

-- Books table
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  genre VARCHAR(100),
  description TEXT,
  price DECIMAL(10, 2),
  isbn VARCHAR(20) UNIQUE,
  published_date DATE,
  status ENUM('active', 'inactive', 'archived') DEFAULT 'active',
  cover_image VARCHAR(500),
  file_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
  INDEX idx_author_id (author_id),
  INDEX idx_genre (genre),
  INDEX idx_status (status)
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_id INT NOT NULL,
  book_id INT NOT NULL,
  royalty_percentage DECIMAL(5, 2),
  advance DECIMAL(10, 2),
  terms TEXT,
  start_date DATE,
  end_date DATE,
  contract_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'expired', 'terminated') DEFAULT 'active',
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  INDEX idx_author_id (author_id),
  INDEX idx_book_id (book_id),
  INDEX idx_status (status)
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  quantity INT DEFAULT 1,
  amount DECIMAL(10, 2),
  sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_email VARCHAR(255),
  format ENUM('digital', 'physical', 'audiobook') DEFAULT 'digital',
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  INDEX idx_book_id (book_id),
  INDEX idx_sale_date (sale_date)
);

-- Royalties table
CREATE TABLE IF NOT EXISTS royalties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_id INT NOT NULL,
  book_id INT NOT NULL,
  amount DECIMAL(10, 2),
  period_start DATE,
  period_end DATE,
  payment_date DATE,
  status ENUM('pending', 'paid', 'processing') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  INDEX idx_author_id (author_id),
  INDEX idx_status (status)
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  physical_stock INT DEFAULT 0,
  digital_available BOOLEAN DEFAULT TRUE,
  print_on_demand BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  UNIQUE KEY unique_book_inventory (book_id),
  INDEX idx_book_id (book_id)
);
