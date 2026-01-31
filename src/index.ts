import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";
import z from "zod";
import { EventRoutes } from './routes/EventRoutes';


const app = new Elysia()
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
      path: "/docs",
    })
  )
  .use(EventRoutes.createUserRoute)
  .use(EventRoutes.getAllEventsRoutes)
  .use(EventRoutes.deleteEventByIdRoute)
  .use(EventRoutes.alterEventRoute)
  .listen(3000)

  
console.log("Servidor on em http://localhost:3000");

