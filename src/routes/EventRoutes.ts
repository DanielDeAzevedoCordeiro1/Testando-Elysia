import { ApiResponse } from './../types/ApiResponse';
import Elysia from "elysia";
import { CreateEventHandlerImpl } from "../handlers/events/impl/CreateEventHandlerImpl";
import { GetAllEventsHandlerImpl } from "../handlers/events/impl/GetAllEventsHandlerImpl";
import { CreateEventController } from "../controller/events/CreateEventController";
import { GetAllEventsController } from "../controller/events/GetAllEventsController";
import { t } from 'elysia';
import { Events } from '../domain/Event';
import { MemoryDb } from '../db/MemoryDb';


const database = new MemoryDb()
const createEventHandler = new CreateEventHandlerImpl(database);
const getAllEventsHandler = new GetAllEventsHandlerImpl(database);
const createEventController = new CreateEventController(createEventHandler);
const getAllEventsController = new GetAllEventsController(getAllEventsHandler);



const createUserRoute = new Elysia({prefix: "/api/events"})
    .post(
        "/",
        async ({ body }) => {
            const result = await createEventController.handleRequest({
                payload: body,
            });
            return {
                data: result
            } as ApiResponse<Events>
        },
        {
            body: t.Object({
                name: t.String({ description: "Nome do evento" }),
                date: t.String({ description: "Data do evento" }),
                location: t.String({ description: "Localização do evento" }),
            }),
            detail: {
                summary: "Criar novo evento",
                description: "Cria um novo evento no sistema com validação de tipos",
                tags: ["Eventos"],
            },
        }
    );

const getAllEventsRoutes = new Elysia({prefix: "/api/events"})
    .get(
        "/",
        async () => {
            const events = await getAllEventsController.handleRequest();
            return {
                data: events
            } as ApiResponse<Events[] | null>;
        },
        {
            detail: {
                summary: "Obter todos os eventos",
                description: "Recupera todos os eventos do sistema",
                tags: ["Eventos"],
            },
        }
    );

export const EventRoutes = {
    createUserRoute,
    getAllEventsRoutes
};