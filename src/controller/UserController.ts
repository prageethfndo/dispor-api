import { createHash } from "crypto";
import { Request, Response } from "express";
import { DatabaseService } from "../service/DatabaseService";

const prisma = DatabaseService.getClient();

export class UserController {
	static async create(req: Request, res: Response) {
		const user = await prisma.user.create({
			data: {
				name: req.body.name,
				email: req.body.email,
				address: req.body.address,
				contact: req.body.contact,
				password: createHash("sha256")
					.update(req.body.password)
					.digest("base64"),
			},
		});
		return res.json(user);
	}
}
