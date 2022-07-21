import { Request, Response } from "express";
import { DatabaseService } from "../service/DatabaseService";
import { createHash } from "crypto";

const prisma = DatabaseService.getClient();

export class AuthController {
	static async login(req: Request, res: Response) {
		const user = await prisma.user.findFirst({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User with email does not exist." });
		}

		const hashedPass = createHash("sha256")
			.update(req.body.password)
			.digest("base64");

		if (user.password !== hashedPass) {
			return res.status(403).json({ error: "Invalid password." });
		}

		return res.json({
			...user,
			password: "",
		});
	}
}
