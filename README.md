<h1 align="center">Polls API</h1>
<p align="center">A real-time voting system where users can create a poll and other users can cast their votes. The system generates a ranking among the options and updates the votes in real-time.</p>

<p align="center">
  <a href="./LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=3b5998">
  </a>
</p>

## Features:

- Creation of polls with multiple answer options.
- Real-time voting with instant updates of the results.
- Ranking of answer options according to the number of votes.
- WebSocket support for real-time monitoring.

## Requirements:

- Node.js
- Docker


## Getting Started:

```bash
# Clone the repository
git clone https://github.com/trecente/polls-api.git

# Install dependencies
pnpm install

# Configure PostgreSQL and Redis
docker compose up -d

# Create a .env file from the example
cp .env.example .env

# Start the application
pnpm dev
```
 
## API Endpoints:

### Create Poll
This endpoint allows you to create a new poll with a question and multiple answer options.
#### POST `/polls`

#### Request Body:

```json
{
  "title": "What is your favorite movie genre?",
  "options": ["Sci-Fi", "Comedy", "Drama", "Thriller"]
}
```

#### Response Body:

```json
{
  "pollId": "42d132e2-0327-4821-a7ed-06a21dff62ab"
}
```
### Get Poll Details
This endpoint retrieves details of a specific poll by its unique identifier.
#### GET `/polls/:pollId`

#### Response Body:

```json
{
  "poll": {
    "id": "42d132e2-0327-4821-a7ed-06a21dff62ab",
    "title": "What is your favorite movie genre?",
    "createdAt": "2024-02-10T23:25:18.952Z",
    "options": [
      {
        "id": "ec452146-01e9-4a67-943c-dc5bc86c7b2b",
        "title": "Sci-Fi",
        "score": 3
      },
      {
        "id": "fd365ec3-466a-47e1-b623-bd66d2d7b059",
        "title": "Comedy",
        "score": 2
      },
      {
        "id": "d37c03b2-2af1-426d-b801-dffa14c9cdad",
        "title": "Drama",
        "score": 1
      },
      {
        "id": "a7b24df1-983e-47c2-b028-91c5678df23a",
        "title": "Thriller",
        "score": 0
      }
    ]
  }
}
```
### Notes:
- Poll details include id, title, creation date, and options with their id, title, and current vote count.

### Cast Vote
This endpoint allows users to vote for a specific option in a poll.
#### POST `/polls/:pollId/votes`

#### Request Body:

```json
{
  "pollOptionsId": "ec452146-01e9-4a67-943c-dc5bc86c7b2b"
}
```

#### Response Body:

```json
{
  "message": "Voted successfully!"
}
```
### Notes:
- Users can only vote once per poll.
- Invalid option IDs will result in an error.

### Delete Poll
This endpoint allows deleting a poll by its unique identifier.
#### DELETE `/polls/:pollId`

#### Response Body:

```json
{
  "message": "Poll deleted successfully!"
}
```
### Notes:
- Deleting a poll removes all associated votes and data.

## WebSockets:

Connect to `ws:/polls/:pollId/results` for live updates on vote counts in JSON format.
The server broadcasts messages with option ID and current vote count.

## Show your support:

If this project helped you, give it a star! ⭐️