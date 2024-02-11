<h1 align="center">Polls API</h1>
<p align="center">A real-time voting system where users can create a poll and other users can cast their votes. The system generates a ranking among the options and updates the votes in real-time.</p>

<p align="center">
  <a href="./LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=3b5998">
  </a>
</p>

## Requisites

- Node.js
- Docker

## Setup

- Clone the repository
- Install dependencies (`pnpm install`)
- Setup PostgreSQL and Redis (`docker compose up -d`)
- Copy `.env.example` file (`cp .env.example .env`)
- Run application (`pnpm dev`)
- Test it!
 
## HTTP

### Endpoints

- POST `/polls`: Create a new poll.
- GET `/polls/:pollId`: Retrieve details of a specific poll.
- POST `/polls/:pollId/votes`: Cast a vote on a poll option.
- DELETE `/polls/:pollId`: Delete a poll.

Refer to the detailed request/response examples below.

### POST `/polls`

#### Request Body

```json
{
  "title": "What is your favorite color?",
  "options": ["Red", "Blue", "Green"]
}
```

#### Response Body

```json
{
  "pollId": "42d132e2-0327-4821-a7ed-06a21dff62ab"
}
```

### GET `/polls/:pollId`

#### Response Body

```json
{
  "poll": {
    "id": "42d132e2-0327-4821-a7ed-06a21dff62ab",
    "title": "What is your favorite color?",
    "createdAt": "2024-02-10T23:25:18.952Z",
    "options": [
      {
        "id": "ec452146-01e9-4a67-943c-dc5bc86c7b2b",
        "title": "Red",
        "score": 0
      },
      {
        "id": "fd365ec3-466a-47e1-b623-bd66d2d7b059",
        "title": "Blue",
        "score": 0
      },
      {
        "id": "d37c03b2-2af1-426d-b801-dffa14c9cdad",
        "title": "Green",
        "score": 0
      }
    ]
  }
}
```

### POST `/polls/:pollId/votes`

#### Request Body

```json
{
  "pollOptionsId": "ec452146-01e9-4a67-943c-dc5bc86c7b2b"
}
```

#### Response Body

```json
{
  "message": "Voted successfully!"
}
```

### DELETE `/polls/:pollId`

#### Response Body

```json
{
  "message": "Poll deleted successfully!"
}
```

## WebSockets

Connect to `ws:/polls/:pollId/results` for live updates in JSON format.
- The server broadcasts messages in the following format:
```json
{
  "pollOptionsId": "ec452146-01e9-4a67-943c-dc5bc86c7b2b",
  "votes": 1
}
```

## Show your support

Give a ⭐️ if this project helped you!