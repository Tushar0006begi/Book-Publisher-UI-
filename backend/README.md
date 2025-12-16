# Book Platform Backend

Express.js backend for the Book Publishing & E-commerce Platform with MySQL database.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create MySQL Database

Run these commands in your MySQL client:

```sql
-- Login to MySQL
mysql -u root -p

-- Create database and tables
source database/schema.sql

-- (Optional) Load sample data for testing
source database/seed.sql
```

Or manually copy and paste the SQL commands from the files.

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and update with your MySQL credentials:

```
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=book_platform
JWT_SECRET=your_secret_key_here_change_this
```

### 4. Create Upload Directory

```bash
mkdir -p uploads/manuscripts
```

### 5. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on http://localhost:5001

## API Endpoints

### Author Endpoints

- `POST /api/author/register` - Register new author
- `POST /api/author/login` - Author login
- `GET /api/author/profile/:authorId` - Get author profile
- `PUT /api/author/profile/:authorId` - Update author profile
- `POST /api/author/submit` - Submit manuscript (with file upload)
- `GET /api/author/submissions/:authorId` - Get author's submissions
- `GET /api/author/submission/:submissionId` - Get submission details
- `GET /api/author/royalties/:authorId` - Get author royalties
- `GET /api/author/sales/:authorId` - Get author sales

### Publisher Endpoints

- `POST /api/publisher/register` - Register new publisher
- `POST /api/publisher/login` - Publisher login
- `GET /api/publisher/submissions` - Get all submissions (with filters)
- `GET /api/publisher/submission/:submissionId` - Get submission details
- `PUT /api/publisher/submission/:submissionId/status` - Update submission status
- `POST /api/publisher/submission/:submissionId/review` - Add review
- `GET /api/publisher/books` - Get all books
- `POST /api/publisher/books` - Add new book
- `PUT /api/publisher/books/:bookId` - Update book
- `DELETE /api/publisher/books/:bookId` - Delete book
- `GET /api/publisher/contracts` - Get all contracts
- `POST /api/publisher/contracts` - Create contract
- `PUT /api/publisher/contracts/:contractId` - Update contract
- `GET /api/publisher/contracts/:contractId` - Get contract details
- `GET /api/publisher/analytics/overview` - Get analytics overview
- `GET /api/publisher/analytics/sales` - Get sales analytics
- `GET /api/publisher/inventory` - Get inventory
- `PUT /api/publisher/inventory/:bookId` - Update inventory

## Testing the API

You can test the endpoints using tools like Postman, Insomnia, or curl.

Example: Submit a manuscript (author must be logged in or registered first)

```bash
curl -X POST http://localhost:5001/api/author/submit \
  -F "authorId=1" \
  -F "title=My New Book" \
  -F "genre=Fiction" \
  -F "synopsis=An amazing story..." \
  -F "wordCount=85000" \
  -F "targetAudience=Adult" \
  -F "manuscript=@/path/to/manuscript.pdf"
```

## Database Schema

See `database/schema.sql` for the complete database structure including:
- authors
- publishers
- submissions
- submission_reviews
- books
- contracts
- sales
- royalties
- inventory

## Notes

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication (7-day expiry)
- File uploads are stored in `uploads/manuscripts/`
- Default password for seed data: `password123`
