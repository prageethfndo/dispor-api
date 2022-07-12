import { PrismaClient } from "@prisma/client";

export class DatabaseService {
	private static client = new PrismaClient();

	public static getClient() {
		return this.client;
	}
}
