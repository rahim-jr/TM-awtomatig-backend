# Postman Endpoint Tests

Base URL:

```text
http://localhost:5000
```

## 1. Health Check

Method: `GET`

Endpoint:

```text
/health
```

Expected status: `200 OK`

Expected response:

```json
{
  "status": "ok"
}
```

## 2. Get All Tasks

Method: `GET`

Endpoint:

```text
/api/tasks
```

Expected status: `200 OK`

Expected response: array of tasks

```json
[]
```

## 3. Create Task Validation

Method: `POST`

Endpoint:

```text
/api/tasks
```

Body:

```json
{
  "description": "missing title"
}
```

Expected status: `400 Bad Request`

Expected response:

```json
{
  "message": "Title is required"
}
```

## 4. Create Task

Method: `POST`

Endpoint:

```text
/api/tasks
```

Body:

```json
{
  "title": "Temporary backend test task",
  "description": "created while testing MongoDB connection"
}
```

Expected status: `201 Created`

Expected response:

```json
{
  "_id": "TASK_ID",
  "title": "Temporary backend test task",
  "description": "created while testing MongoDB connection",
  "status": "To Do",
  "createdAt": "2026-06-19T00:00:00.000Z",
  "updatedAt": "2026-06-19T00:00:00.000Z"
}
```

## 5. Update Task Status

Method: `PATCH`

Endpoint:

```text
/api/tasks/TASK_ID/status
```

Body:

```json
{
  "status": "Done"
}
```

Expected status: `200 OK`

Expected response includes:

```json
{
  "_id": "TASK_ID",
  "status": "Done"
}
```

## 6. Delete Task

Method: `DELETE`

Endpoint:

```text
/api/tasks/TASK_ID
```

Expected status: `204 No Content`

Expected response body: empty

## 7. Verify Delete

Method: `GET`

Endpoint:

```text
/api/tasks
```

Expected status: `200 OK`

Expected result: deleted `TASK_ID` is not in the response.
