import { Database } from "@/db";
import { Server } from "http";


export const shutdownConnections = (signal: string, server: Server) => {
  process.on(signal, async () => {

    server.close();
    Database.closeConnection();

    console.log(" Process killed with signal", signal);

    process.exit(0);
  });
}