import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

// Parse JSON bodies for POST /quotebook/quote/new
app.use(express.json());

// Quote data
let categories = ["successQuotes", "perseveranceQuotes", "happinessQuotes"];

let successQuotes = [
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston S. Churchill",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
];

let perseveranceQuotes = [
  {
    quote:
      "It’s not that I’m so smart, it’s just that I stay with problems longer.",
    author: "Albert Einstein",
  },
  {
    quote: "Perseverance is failing 19 times and succeeding the 20th.",
    author: "Julie Andrews",
  },
];

let happinessQuotes = [
  {
    quote:
      "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    quote:
      "For every minute you are angry you lose sixty seconds of happiness.",
    author: "Ralph Waldo Emerson",
  },
];

// Helper to access quotes by category name
const quoteData = {
  successQuotes,
  perseveranceQuotes,
  happinessQuotes,
};

app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hello from Express inside a Dev Container!",
    name: "Baheer Noori"
  });
});



app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/quotebook/categories", (req, res) => {
  const lines = categories.map(
    (category) => `A possible category is ${category}`
  );

  res.type("text").send(lines.join("\n"));
});

app.get("/quotebook/quote/:category", (req, res) => {
  const category = req.params.category;

  // Check if category is valid
  if (!categories.includes(category)) {
    return res.status(400).json({
      error: `no category listed for ${category}`,
    });
  }

  const quotesArray = quoteData[category];
  const randomIndex = Math.floor(Math.random() * quotesArray.length);
  const randomQuote = quotesArray[randomIndex];

  res.json(randomQuote);
});

app.post("/quotebook/quote/new", (req, res) => {
  const { category, quote, author } = req.body;

  // Check required fields
  if (!category || !quote || !author) {
    return res.status(400).json({
      error: "invalid or insufficient user input",
    });
  }

  // Check category is valid
  if (!categories.includes(category)) {
    return res.status(400).json({
      error: "invalid or insufficient user input",
    });
  }

  // Add the new quote to the correct array
  const newQuote = { quote, author };
  quoteData[category].push(newQuote);

  // Plain-text success message
  res.type("text").send("Success!");
});



app.get("/math/circle/:radius", (req, res) => {
  const radius = Number(req.params.radius);

  if (Number.isNaN(radius)) {
    return res.status(400).json({
      error: "Radius must be a number."
    });
  }

  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;

  res.json({
    radius,
    area,
    circumference
  });
});


app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = Number(req.params.width);
  const height = Number(req.params.height);

  if (Number.isNaN(width) || Number.isNaN(height)) {
    return res.status(400).json({
      error: "Width and height must be numbers."
    });
  }

  const area = width * height;
  const perimeter = 2 * (width + height);

  res.json({
    width,
    height,
    area,
    perimeter
  });
});

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = Number(req.params.base);
  const exponent = Number(req.params.exponent);

  if (Number.isNaN(base) || Number.isNaN(exponent)) {
    return res.status(400).json({
      error: "Invalid base or exponent. Please provide numeric values."
    });
  }

  const result = Math.pow(base, exponent);
  const responseBody = { base, exponent, result };

  // optional ?root=true query
  if (req.query.root !== undefined) {
    responseBody.root = Math.sqrt(base);
  }

  res.json(responseBody);
});


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
