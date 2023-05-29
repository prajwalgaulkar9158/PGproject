
 ### Blogging Site Mini Project

This mini project is a blogging site with basic CRUD (Create, Read, Update, Delete) functionality for authors and blogs. It allows authors to create accounts, create and manage their blogs, and perform various operations on the blogs.

## Team Information
Group: 5
Members:
- Ishaan Mangal
- Prajwal Gaulkar
- Chandrakant Tiwari

## Phase I

### Models
- Author Model
  - Attributes:
    - `fname`: First name (mandatory)
    - `lname`: Last name (mandatory)
    - `title`: Title (mandatory, options: Mr, Mrs, Miss)
    - `email`: Email address (mandatory, valid email format, unique)
    - `password`: Password (mandatory)

- Blogs Model
  - Attributes:
    - `title`: Blog title (mandatory)
    - `body`: Blog content (mandatory)
    - `authorId`: Author ID (mandatory, references Author model)
    - `tags`: Array of strings (optional)
    - `category`: Blog category (mandatory)
    - `subcategory`: Array of strings (optional, examples: technology-[web development, mobile development, AI, ML, etc.])
    - `createdAt`: Creation date
    - `updatedAt`: Last update date
    - `deletedAt`: Deletion date (when the document is deleted)
    - `isDeleted`: Deletion status (boolean, default: false)
    - `publishedAt`: Publication date (when the blog is published)
    - `isPublished`: Publication status (boolean, default: false)

### Author APIs /authors
- Create an author - at least 5 authors
- Create an author document from the request body.
  - Endpoint: BASE_URL/authors

### POST /blogs
- Create a blog document from the request body. Get authorId in the request body only.
- Ensure the authorId is a valid authorId by checking if the author exists in the authors collection.
- Return HTTP status 201 on successful blog creation. Also return the blog document. The response should be a JSON object.
  - Example response:
    ```json
    {
      "status": true,
      "data": {
        "_id": "60a7c6dd45f789001f9b5aa2",
        "title": "Sample Blog",
        "body": "This is a sample blog.",
        "authorId": "60a7c6c345f789001f9b5aa1",
        "tags": ["sample", "blog"],
        "category": "Technology",
        "subcategory": ["Web Development"],
        "createdAt": "2021-05-21T10:18:21.789Z",
        "updatedAt": "2021-05-21T10:18:21.789Z"
      }
    }
    ```

### GET /blogs
- Returns all blogs in the collection that aren't deleted and are published.
- Return HTTP status 200 if any documents are found. The response structure should be a JSON object.
  - Example response:
    ```json
    {
      "status": true,
      "message": "Blogs list",
      "data": [
        {
          "_id": "60a7c6dd45f789001f9b5aa2",
          "title": "Sample Blog",
          "body": "This is a sample blog.",
          "authorId": "60a7c6c345f789001f9b5aa1",
          "tags": ["sample", "blog"],
          "category": "Technology",
          "subcategory": ["Web Development"],
          "createdAt": "2021-05-21T10:18:21.789Z",
          "updatedAt": "2021-05-21T10:18:21.789Z"
        },
        ...
      ]
    }
    ```

### GET /blogs/:id
- Returns the details of a specific blog identified by its ID.
- Get the blog ID from the request URL parameters.
- If the blog with the provided ID is found and is published, return HTTP status 200 along with the blog details. The response structure should be a JSON object.
  - Example response:
    ```json
    {
      "status": true,
      "data": {
        "_id": "60a7c6dd45f789001f9b5aa2",
        "title": "Sample Blog",
        "body": "This is a sample blog.",
        "authorId": "60a7c6c345f789001f9b5aa1",
        "tags": ["sample", "blog"],
        "category": "Technology",
        "subcategory": ["Web Development"],
        "createdAt": "2021-05-21T10:18:21.789Z",
        "updatedAt": "2021-05-21T10:18:21.789Z"
      }
    }
    ```

### PUT /blogs/:id
- Update a specific blog identified by its ID.
- Get the blog ID from the request URL parameters.
- Update the blog document with the data provided in the request body.
- Return HTTP status 200 along with the updated blog document. The response structure should be a JSON object.
  - Example response:
    ```json
    {
      "status": true,
      "data": {
        "_id": "60a7c6dd45f789001f9b5aa2",
        "title": "Updated Blog",
        "body": "This is an updated blog.",
        "authorId": "60a7c6c345f789001f9b5aa1",
        "tags": ["updated", "blog"],
        "category": "Technology",
        "subcategory": ["Web Development"],
        "createdAt": "2021-05-21T10:18:21.789Z",
        "updatedAt": "2021-05-21T12:35:47.903Z"
      }
    }
    ```

### DELETE /blogs/:id
- Soft delete a specific blog identified by its ID.
- Get the blog ID from the request URL parameters.
- Set the `isDeleted` field to `true` and `deletedAt` field to the current date and time.
- Return HTTP status 200 along with a success message. The response structure should be a JSON object.
  - Example response:
    ```json
    {
      "status": true,
      "message": "Blog deleted successfully"
    }
    ```

## Phase II (Additional Functionality)

- Implement authentication using JWT (JSON Web Tokens) for author login and authorization for protected routes.
- Add endpoints for author registration, login, and logout.
- Implement authorization to allow authors to perform CRUD operations only on their own blogs.
- Implement filtering and searching based on different criteria (e.g., category, tags, subcategory) for the blogs list endpoint.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Postman (for testing APIs)

## Setup Instructions
1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Set up your MongoDB database and update the connection details in the configuration files.
4. Start the server using `npm start`.
5. Use Postman or any API testing tool to test the available APIs