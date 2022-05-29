import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = 3000;

// parse json bodies
app.use(express.json());

app.listen(port, async () => {
	const client = new PrismaClient();
	await client.$connect();

	await client.fDO.create({
		data: {
			name: "Fernando",
			age: 23
		}
	});

	console.log(`Server is running on port ${port}`);
});
