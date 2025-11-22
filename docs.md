# API Documentation

This document describes the available endpoints for the Math and QuoteBook APIs.

---

## Math API

### 1. Circle – Area and Circumference

**Request Format:** `/math/circle/:radius`  
**Request Type:** `GET`  
**Returned Data Format:** JSON  

**Description:**  
Calculates the area and circumference of a circle with the given `radius`.

**Example Request:**  
`/math/circle/2`

**Example Response:**
```json
{
  "radius": 2,
  "area": 12.566370614359172,
  "circumference": 12.566370614359172
}
```

**Error Handling:**

If `radius` is not a valid number:
```json
{
  "error": "Radius must be a number."
}
```

---

### 2. Rectangle – Area and Perimeter

**Request Format:** `/math/rectangle/:width/:height`  
**Request Type:** `GET`  
**Returned Data Format:** JSON  

**Description:**  
Calculates the area and perimeter of a rectangle using `width` and `height`.

**Example Request:**  
`/math/rectangle/4/2`

**Example Response:**
```json
{
  "width": 4,
  "height": 2,
  "area": 8,
  "perimeter": 12
}
```

**Error Handling:**

If `width` or `height` is not a valid number:
```json
{
  "error": "Width and height must be numbers."
}
```

---

### 3. Power – Base and Exponent (Optional Root)

**Request Format:** `/math/power/:base/:exponent`  
**Request Type:** `GET`  
**Returned Data Format:** JSON  

**Description:**  
Calculates `base` raised to `exponent`.  
If the optional query parameter `root` is present, the square root of `base` is also returned.

**Example Request:**  
`/math/power/4/2`

**Example Response:**
```json
{
  "base": 4,
  "exponent": 2,
  "result": 16
}
```

**Example Request with Root:**  
`/math/power/9/2?root=true`

**Example Response with Root:**
```json
{
  "base": 9,
  "exponent": 2,
  "result": 81,
  "root": 3
}
```

**Error Handling:**

If `base` or `exponent` is not a valid number:
```json
{
  "error": "Invalid base or exponent. Please provide numeric values."
}
```

---

## QuoteBook API

### 4. List Quote Categories

**Request Format:** `/quotebook/categories`  
**Request Type:** `GET`  
**Returned Data Format:** Plain text  

**Description:**  
Returns a human-readable list of all available quote categories.

**Example Request:**  
`/quotebook/categories`

**Example Response:**
```text
A possible category is successQuotes
A possible category is perseveranceQuotes
A possible category is happinessQuotes
```

---

### 5. Get Random Quote from a Category

**Request Format:** `/quotebook/quote/:category`  
**Request Type:** `GET`  
**Returned Data Format:** JSON  

**Description:**  
Returns a random quote (with its author) from the specified `category`.

Valid categories:

- `successQuotes`
- `perseveranceQuotes`
- `happinessQuotes`

**Example Request:**  
`/quotebook/quote/happinessQuotes`

**Example Response:**
```json
{
  "quote": "Happiness is not something ready made. It comes from your own actions.",
  "author": "Dalai Lama"
}
```

**Error Handling:**

If the category does not exist:
```json
{
  "error": "no category listed for someCategory"
}
```

Status code: `400 Bad Request`.

---

### 6. Add a New Quote

**Request Format:** `/quotebook/quote/new`  
**Request Type:** `POST`  
**Returned Data Format:** Plain text (`Success!` on success)  

**Body Parameters (JSON):**

- `category` – must be one of the known categories in the `categories` array  
- `quote` – the quote text  
- `author` – the author of the quote  

**Description:**  
Adds a new quote object to the array corresponding to the given `category`.

The new quote is stored as:

```json
{
  "quote": "Some quote text",
  "author": "Author Name"
}
```

**Example Request Body:**
```json
{
  "category": "happinessQuotes",
  "quote": "Test quote",
  "author": "Me"
}
```

**Example Successful Response (text):**
```text
Success!
```

**Error Handling:**

If `category`, `quote`, or `author` is missing, or `category` is invalid:
```json
{
  "error": "invalid or insufficient user input"
}
```

Status code: `400 Bad Request`.
