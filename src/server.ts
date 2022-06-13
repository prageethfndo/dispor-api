import express from "express";
import { readFileSync } from "fs";

const app = express();
const port = process.env.PORT || 3000;

// parse json bodies
app.use(express.json());

app.get("/items", (req, res) => {
	const data = JSON.parse(readFileSync(`${__dirname}/data.json`, "utf8"));
	return res.json(data);
});

app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
});
