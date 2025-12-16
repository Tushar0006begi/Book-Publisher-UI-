-- Seed data for testing
USE book_platform;

-- Insert sample authors (password is 'password123' hashed with bcrypt)
INSERT INTO authors (name, email, password, bio, location, genres) VALUES
('Sarah Johnson', 'sarah.johnson@email.com', '$2b$10$rGfJ8K5HhN7qT8F9YxKNLe5bvN0x8d9yL3QzYfXpWnE6xN0zK1L9O', 'Award-winning fiction author with 10+ years experience', 'New York, USA', 'Fiction, Mystery, Thriller'),
('Michael Chen', 'michael.chen@email.com', '$2b$10$rGfJ8K5HhN7qT8F9YxKNLe5bvN0x8d9yL3QzYfXpWnE6xN0zK1L9O', 'Science fiction and fantasy novelist', 'San Francisco, USA', 'Sci-Fi, Fantasy'),
('Emily Rodriguez', 'emily.rodriguez@email.com', '$2b$10$rGfJ8K5HhN7qT8F9YxKNLe5bvN0x8d9yL3QzYfXpWnE6xN0zK1L9O', 'Romance and contemporary fiction writer', 'Austin, USA', 'Romance, Contemporary');

-- Insert sample publisher
INSERT INTO publishers (name, email, password, company_name) VALUES
('John Publisher', 'john@publishinghouse.com', '$2b$10$rGfJ8K5HhN7qT8F9YxKNLe5bvN0x8d9yL3QzYfXpWnE6xN0zK1L9O', 'Premier Publishing House');

-- Insert sample submissions
INSERT INTO submissions (author_id, title, genre, synopsis, word_count, target_audience, status, submission_date) VALUES
(1, 'The Mystery of Hollow Creek', 'Mystery', 'A thrilling mystery set in a small town where secrets run deep.', 85000, 'Adult', 'pending', NOW()),
(1, 'Shadows in the Night', 'Thriller', 'A psychological thriller about a detective haunting past.', 92000, 'Adult', 'under_review', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 'The Last Starship', 'Sci-Fi', 'Humanity last hope lies in an ancient alien vessel.', 120000, 'Young Adult', 'accepted', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(3, 'Summer Love', 'Romance', 'A heartwarming summer romance in coastal Maine.', 75000, 'Adult', 'pending', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Insert sample books
INSERT INTO books (author_id, title, genre, description, price, isbn, published_date, status) VALUES
(1, 'The Silent Witness', 'Mystery', 'A gripping mystery novel that will keep you on the edge of your seat.', 14.99, '978-1234567890', '2024-01-15', 'active'),
(2, 'Galaxy Warriors', 'Sci-Fi', 'An epic space adventure across the cosmos.', 16.99, '978-1234567891', '2024-02-20', 'active'),
(3, 'Hearts Entwined', 'Romance', 'A beautiful love story that transcends time.', 12.99, '978-1234567892', '2024-03-10', 'active');

-- Insert sample contracts
INSERT INTO contracts (author_id, book_id, royalty_percentage, advance, terms, start_date, end_date, status) VALUES
(1, 1, 15.00, 5000.00, 'Standard publishing contract with 15% royalty on net sales.', '2024-01-01', '2029-01-01', 'active'),
(2, 2, 18.00, 8000.00, 'Enhanced contract with 18% royalty and international rights.', '2024-02-01', '2029-02-01', 'active'),
(3, 3, 12.00, 3000.00, 'Standard contract with digital and print rights.', '2024-03-01', '2029-03-01', 'active');

-- Insert sample sales
INSERT INTO sales (book_id, quantity, amount, sale_date, customer_email, format) VALUES
(1, 1, 14.99, DATE_SUB(NOW(), INTERVAL 1 DAY), 'customer1@email.com', 'digital'),
(1, 1, 14.99, DATE_SUB(NOW(), INTERVAL 2 DAY), 'customer2@email.com', 'physical'),
(2, 1, 16.99, DATE_SUB(NOW(), INTERVAL 3 DAY), 'customer3@email.com', 'digital'),
(3, 2, 25.98, DATE_SUB(NOW(), INTERVAL 1 DAY), 'customer4@email.com', 'digital'),
(1, 1, 14.99, DATE_SUB(NOW(), INTERVAL 5 DAY), 'customer5@email.com', 'digital');

-- Insert sample royalties
INSERT INTO royalties (author_id, book_id, amount, period_start, period_end, payment_date, status) VALUES
(1, 1, 450.00, '2024-01-01', '2024-01-31', '2024-02-15', 'paid'),
(1, 1, 523.50, '2024-02-01', '2024-02-29', '2024-03-15', 'paid'),
(2, 2, 782.00, '2024-02-01', '2024-02-29', NULL, 'pending'),
(3, 3, 234.00, '2024-03-01', '2024-03-31', NULL, 'pending');

-- Insert sample inventory
INSERT INTO inventory (book_id, physical_stock, digital_available, print_on_demand) VALUES
(1, 150, TRUE, TRUE),
(2, 200, TRUE, TRUE),
(3, 100, TRUE, FALSE);

-- Insert sample reviews
INSERT INTO submission_reviews (submission_id, reviewer_name, rating, comments) VALUES
(2, 'Jane Editor', 4, 'Strong plot and well-developed characters. Minor pacing issues in the middle section.'),
(3, 'Bob Reviewer', 5, 'Excellent world-building and compelling narrative. Highly recommended for publication.');
