import { Request, Response } from "express";
import { DatabaseService } from "../service/DatabaseService";

const prisma = DatabaseService.getClient();

export class ItemsController {
	static async getOne(req: Request, res: Response) {
		const item = await prisma.item.findFirst({ where: { id: req.params.id } });

		if (!item) {
			return res.status(404).json({ error: "Item with ID does not exist." });
		}

		return res.json(item);
	}

	static async getAll(_: Request, res: Response) {
		const items = await prisma.item.findMany();
		return res.json(items);
	}

	static async create(req: Request, res: Response) {
		const item = await prisma.item.create({
			data: {
				name: req.body.name,
				unitWeight: parseInt(req.body.unitWeight),
				unitPrice: parseFloat(req.body.unitPrice),
				material: req.body.material,
			},
		});
		return res.json(item);
	}

	static async update(req: Request, res: Response) {
		const updatedItem = await prisma.item.update({
			where: { id: req.params.id },
			data: {
				name: req.body.name,
				unitWeight: parseInt(req.body.unitWeight),
				unitPrice: parseFloat(req.body.unitPrice),
				material: req.body.material,
			},
		});
		return res.json(updatedItem);
	}

	static async delete(req: Request, res: Response) {
		const item = await prisma.item.findFirst({ where: { id: req.params.id } });

		if (!item) {
			return res.status(404).json({ error: "Item with ID does not exist." });
		}

		await prisma.item.delete({
			where: { id: req.params.id },
		});

		return res.json({ deleted: true });
	}
}
