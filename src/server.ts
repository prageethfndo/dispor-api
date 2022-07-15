import express, { Response } from "express";
import { BidsController } from "./controller/BidsController";
import { ItemsController } from "./controller/ItemsController";
import { ListingController } from "./controller/ListingController";
import { UserController } from "./controller/UserController";
import { DatabaseService } from "./service/DatabaseService";

const app = express();
const port = process.env.PORT || 3000;

// parse json bodies
app.use(express.json());

app.post("/login", (req, res) => {});

app.route("/users").post((req, res) => {
	UserController.create(req, res).catch((e) => handleError(res, e));
});

app
	.route("/users/:id")
	.delete((req, res) => {
		UserController.delete(req, res).catch((e) => handleError(res, e));
	})
	.put((req, res) => {
		UserController.update(req, res).catch((e) => handleError(res, e));
	});

app.route("/users/:id/listings").get((req, res) => {
	ListingController.getUserListings(req, res).catch((e) => handleError(res, e));
});

app.route("/users/:id/bids").get((req, res) => {
	BidsController.getUserBids(req, res).catch((e) => handleError(res, e));
});

app
	.route("/listings")
	.get((req, res) => {
		ListingController.getAll(req, res).catch((e) => handleError(res, e));
	})
	.post((req, res) => {
		ListingController.create(req, res).catch((e) => handleError(res, e));
	});

app
	.route("/listings/:id")
	.get((req, res) => {
		ListingController.getOne(req, res).catch((e) => handleError(res, e));
	})
	.put((req, res) => {
		ListingController.update(req, res).catch((e) => handleError(res, e));
	})
	.delete((req, res) => {
		ListingController.delete(req, res).catch((e) => handleError(res, e));
	});

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

app
	.route("/bids")
	.get((req, res) => {
		BidsController.getAll(req, res).catch((e) => handleError(res, e));
	})
	.post((req, res) => {
		BidsController.create(req, res).catch((e) => handleError(res, e));
	});

app
	.route("/bids/:id")
	.get((req, res) => {
		BidsController.getOne(req, res).catch((e) => handleError(res, e));
	})
	.put((req, res) => {
		BidsController.update(req, res).catch((e) => handleError(res, e));
	})
	.delete((req, res) => {
		BidsController.delete(req, res).catch((e) => handleError(res, e));
	});

app.listen(port, async () => {
	const prisma = DatabaseService.getClient();
	await prisma.$connect();
	console.log(`Server is running on port ${port}`);
});

const handleError = (res: Response, e: any) => {
	res.status(500).json({ error: e?.toString() });
};
