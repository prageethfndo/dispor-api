import { Request, Response } from "express";
import { DatabaseService } from "../service/DatabaseService";

const prisma = DatabaseService.getClient();

export class BidsController {
	static async getOne(req: Request, res: Response) {
		const bid = await prisma.bid.findFirst({
			where: { id: req.params.id },
			include: { listing: true, user: true },
		});

		if (!bid) {
			return res.status(404).json({ error: "Bid with ID does not exist." });
		}

		return res.json(bid);
	}

	static async getAll(_: Request, res: Response) {
		const bids = await prisma.bid.findMany({
			include: { listing: true, user: true },
		});
		return res.json(bids);
	}

	static async create(req: Request, res: Response) {
		const bid = await prisma.bid.create({
			data: {
				listingId: req.body.listingId,
				userId: req.body.userId,
				amount: parseFloat(req.body.amount),
			},
		});
		return res.json(bid);
	}

	static async update(req: Request, res: Response) {
		const updatedBid = await prisma.bid.update({
			where: { id: req.params.id },
			data: {
				listingId: req.body.listingId,
				userId: req.body.userId,
				amount: parseFloat(req.body.amount),
				status: req.body.status,
				date: new Date(),
			},
		});
		return res.json(updatedBid);
	}

	static async delete(req: Request, res: Response) {
		const bid = await prisma.bid.findFirst({ where: { id: req.params.id } });

		if (!bid) {
			return res.status(404).json({ error: "Bid with ID does not exist." });
		}

		await prisma.bid.delete({
			where: { id: req.params.id },
		});

		return res.json({ deleted: true });
	}

	static async getUserBids(req: Request, res: Response) {
		const bids = await prisma.bid.findMany({
			where: {
				userId: req.params.id,
			},
			include: {
				listing: true,
				user: true,
			},
		});
		return res.json(bids);
	}
}
