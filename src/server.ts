import express, { Response } from "express";
import { ItemsController } from "./controller/ItemsController";
import { DatabaseService } from "./service/DatabaseService";

const app = express();
const port = process.env.PORT || 3000;

// parse json bodies
app.use(express.json());

app.post("/login", (req, res) => {});

app.post("/register", (req, res) => {});

app
	.route("/items")
	.get((req, res) => {
		ItemsController.getAll(req, res).catch((e) => handleError(res, e));
	})
	.post((req, res) => {
		ItemsController.create(req, res).catch((e) => handleError(res, e));
	});

app
	.route("/items/:id")
	.get((req, res) => {
		ItemsController.getOne(req, res).catch((e) => handleError(res, e));
	})
	.put((req, res) => {
		ItemsController.update(req, res).catch((e) => handleError(res, e));
	})
	.delete((req, res) => {
		ItemsController.delete(req, res).catch((e) => handleError(res, e));
	});

app.listen(port, async () => {
	const prisma = DatabaseService.getClient();
	await prisma.$connect();
	console.log(`Server is running on port ${port}`);
});

const handleError = (res: Response, e: any) => {
	res.status(500).json({ error: e?.toString() });
};
