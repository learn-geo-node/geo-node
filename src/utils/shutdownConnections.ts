import { Database } from "@/db";


export const shutdownConnections = (signal: string, db: Database, closeServerConnection: () => Promise<void>) => {
  process.on(signal, async () => {

    await closeServerConnection();
    await db.closeConnection();

    console.log(" Process killed with signal", signal);

    process.exit(0);
  });
}