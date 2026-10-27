# Notes REST API — MongoDB + Mongoose

## Requirements
- Node.js
- MongoDB running locally, or a MongoDB Atlas database

## Setup
1. Install dependencies: `npm install`
2. Check `.env` and set `MONGODB_URI` to your MongoDB connection string.
3. Seed the database with sample notes: `npm run seed`
4. Start the API: `npm start`

The server starts at `http://localhost:3000` after MongoDB connects.

## Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes?category=Work` | Filter notes by category |
| GET | `/api/notes/:id` | Get a note by MongoDB ID |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

Valid categories: `General`, `Work`, `Personal`, `Ideas`.

Example POST body:
```json
{
  "title": "My note",
  "content": "Note content",
  "category": "General"
}
```

## Status codes
- `200`: Request successful
- `201`: Note created
- `400`: Invalid input, invalid ID, or validation error
- `404`: Note not found
- `500`: Unexpected server error

`.env` is ignored by Git. Do not commit real database credentials.
