# Lesson 1 — Express REST API in MVC

A small user-management API built while working through system design fundamentals. The point of this lesson isn't the features — it's the **separation of layers**: routes don't know about data, controllers don't know about URLs, and the model is the only thing that knows where data actually lives.

## Stack

- **Node.js** with ES modules (`"type": "module"`)
- **Express 5**
- **dotenv** for configuration
- **nodemon** for development

## Project Structure

```
Lesson1/
├── server.js                  # Starts the listener. Nothing else.
├── app.js                     # Wires middleware → routes → error handlers
├── config/                    # Environment + connection setup
├── routes/
│   ├── index.js               # Mounts route groups
│   └── userRoutes.js          # URL → controller mapping only
├── controllers/
│   └── userController.js      # Request/response logic
├── models/
│   └── userModel.js           # Owns the data
└── middleware/
    └── errorHandler.js        # 404 handler + central error catcher
```

### Why the layers are split this way

**`server.js` vs `app.js`** — `app.js` exports a fully configured Express app without binding a port. That makes the app importable by a test runner (like Supertest) which can drive it in-process. If `app.listen()` lived in the same file, every test run would need a real open port.

**`routes/` holds paths, nothing else.** Each route is one line mapping a URL to a controller function. You can read the entire API surface in a few seconds without scrolling through business logic.

**`controllers/` holds request handling.** These read `req`, call the model, and shape the response. They never touch the data store directly.

**`models/` owns the data.** This is the real payoff of MVC. The model is currently an in-memory array — when it becomes a database, that one file gets rewritten and *nothing in the controllers changes*. That boundary is the whole reason the extra folders earn their keep.

**`middleware/errorHandler.js` is registered last.** Express runs middleware in registration order, so a handler placed after all routes only executes when nothing above it matched or when an error was thrown.

## Getting Started

```bash
# install dependencies
npm install

# create your .env file
echo "PORT=3000" > .env

# run in development (auto-restarts on save)
npm run dev

# or run normally
npm start
```

> **Note:** `PORT` is read from `.env` with no fallback value, so the server will not start correctly without it.

## API Endpoints

All user routes are mounted under `/users`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check — confirms the server is running |
| `GET` | `/users` | Retrieve all users |
| `POST` | `/users` | Create a new user |
| `GET` | `/users/search?name=` | Find a user by exact name |
| `GET` | `/users/paginate?page=&limit=` | Return a slice of the users list |
| `GET` | `/users/sort?sortBy=name` | Return users sorted by name |
| `GET` | `/users/:id` | Retrieve a single user by ID |

### Example requests

**Create a user**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com"}'
```
```json
{ "id": 1, "Name": "Ada", "Email": "ada@example.com" }
```

**Get all users**
```bash
curl http://localhost:3000/users
```
```json
{ "Data": [{ "id": 1, "Name": "Ada", "Email": "ada@example.com" }] }
```

**Search by name**
```bash
curl "http://localhost:3000/users/search?name=Ada"
```
```json
{ "searched": "Ada", "found": { "id": 1, "Name": "Ada", "Email": "ada@example.com" } }
```

## Status Codes

| Code | Meaning | Used when |
|------|---------|-----------|
| `200` | OK | Successful read |
| `201` | Created | A new user was created |
| `400` | Bad Request | Missing or invalid input from the client |
| `404` | Not Found | No user or route matched |
| `500` | Server Error | Unhandled exception, caught by the error handler |

The distinction that matters here: **400 is the client's fault, 500 is yours.** Missing form fields are a 400 — not a thrown exception. And `401` means "not authenticated," which is a different thing entirely from "you sent me bad input."

## Notes & Gotchas

**Route ordering is not cosmetic.** In `userRoutes.js`, `/search` and `/paginate` are declared *before* `/:id`. Express matches top to bottom and stops at the first hit — if `/:id` came first, a request to `/users/search` would match it with `id = "search"`, and the search endpoint would silently never run.

**REST uses nouns, not verbs.** The create endpoint is `POST /users`, not `POST /newuser`. The URL names the resource; the HTTP method names the action.

**`.sort()` mutates in place.** Sorting the stored array directly would permanently reorder the source data as a side effect of a read request. The model sorts a copy instead.

**Data is in-memory.** Everything resets when the server restarts. That's intentional for this lesson — persistence comes next.

## Roadmap

- [ ] Swap the in-memory model for a real database
- [ ] Add a service layer between controllers and models
- [ ] Input validation middleware
- [ ] Automated tests with Jest + Supertest
- [ ] Authentication
