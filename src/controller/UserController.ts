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

	static async update(req: Request, res: Response) {
		const updatedUser = await prisma.user.update({
			where: { id: req.params.id },
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
		return res.json(updatedUser);
	}

	static async delete(req: Request, res: Response) {
		const user = await prisma.user.findFirst({ where: { id: req.params.id } });

		if (!user) {
			return res.status(404).json({ error: "User with ID does not exist." });
		}

		await prisma.user.delete({
			where: { id: user.id },
		});

		return res.json({ deleted: true });
	}
}
