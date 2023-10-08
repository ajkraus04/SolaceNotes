import { PrismaClient } from "@prisma/client";
import { defineConfig } from "cypress";



export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
         async resetDB() {
           const prisma = new PrismaClient()
           await prisma.notes.deleteMany({});
           return null;
        }
      })
    },
    baseUrl:"http://localhost:3000"
  },
});
