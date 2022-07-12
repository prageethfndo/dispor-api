import { Request, Response } from "express";
import { DatabaseService } from "../service/DatabaseService";

const prisma = DatabaseService.getClient();

export class ListingController {
	static async getOne(req: Request, res: Response) {
		const listing = await prisma.listing.findFirst({
			where: { id: req.params.id },
		});

		if (!listing) {
			return res.status(404).json({ error: "Listing with ID does not exist." });
		}

		return res.json(listing);
	}

	static async getAll(_: Request, res: Response) {
		const listings = await prisma.listing.findMany();
		return res.json(listings);
	}

	static async create(req: Request, res: Response) {
		const listing = await prisma.listing.create({
			data: {
				userId: req.body.userId,
				title: req.body.title,
				description: req.body.description,
				weight: parseInt(req.body.weight),
				price: parseFloat(req.body.price),
			},
		});
		return res.json(listing);
	}

	static async update(req: Request, res: Response) {
		const updatedListing = await prisma.listing.update({
			where: { id: req.params.id },
			data: {
				userId: req.body.userId,
				title: req.body.title,
				description: req.body.description,
				weight: parseInt(req.body.weight),
				price: parseFloat(req.body.price),
			},
		});
		return res.json(updatedListing);
	}

	static async delete(req: Request, res: Response) {
		const listing = await prisma.listing.findFirst({
			where: { id: req.params.id },
		});

		if (!listing) {
			return res.status(404).json({ error: "Item with ID does not exist." });
		}

		await prisma.listing.delete({
			where: { id: req.params.id },
		});

		return res.json({ deleted: true });
	}
}
