import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = 3000;

// parse json bodies
app.use(express.json());

app.listen(port, async () => {
	const client = new PrismaClient();
	await client.$connect();

	await client.user.create({
		data: {      
  name: "Kumara",  
  email: "kumara@gmail.com", 
  address  : "kumara inna gedra",
  contact  : "0745624584",
  password : "1234Isuru*"
		}
	});

	console.log(`Server is running on port ${port}`);
});
