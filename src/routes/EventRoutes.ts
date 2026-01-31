import { ApiResponse } from './../types/ApiResponse';
import Elysia from "elysia";
import { CreateEventHandlerImpl } from "../handlers/events/impl/CreateEventHandlerImpl";
import { GetAllEventsHandlerImpl } from "../handlers/events/impl/GetAllEventsHandlerImpl";
import { CreateEventController } from "../controller/events/CreateEventController";
import { GetAllEventsController } from "../controller/events/GetAllEventsController";
import { t } from 'elysia';
import { EventData, EventDataWithStatus, Events } from '../domain/Event';
import { MemoryDb } from '../db/MemoryDb';
import { DeleteEventByIdHandlerImpl } from '../handlers/events/impl/DeleteEventByIdHandlerImpl';
import { DeleteEventByIdController } from '../controller/events/DeleteEventByIdController';
import { AlterEventController } from '../controller/events/AlterEventController';
import { AlterEventHandlerImpl } from '../handlers/events/impl/AlterEventHandlerImpl';


const database = new MemoryDb()
const createEventHandler = new CreateEventHandlerImpl(database);
const getAllEventsHandler = new GetAllEventsHandlerImpl(database);
const deleteEventByIdHandler = new DeleteEventByIdHandlerImpl(database);
const alterEventHandler = new AlterEventHandlerImpl(database);
const createEventController = new CreateEventController(createEventHandler);
const getAllEventsController = new GetAllEventsController(getAllEventsHandler);
const alterEventController = new AlterEventController(alterEventHandler);
const deleteEventByIdController = new DeleteEventByIdController(deleteEventByIdHandler);



const createUserRoute = new Elysia({prefix: "/api/events"})
    .post(
        "/",
        async ({ body, set }) => {
            const result = await createEventController.handleRequest({
                payload: body,
            });
            set.status = result ? 201 : 400;
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
        async ( { set } ) => {
            const events = await getAllEventsController.handleRequest();
            set.status = 200;
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

const alterEventRoute = new Elysia({prefix: "/api/events"})
    .put(
        "/:eventId",
        async ({ params, body, set }) => {
            const result = await alterEventController.handle(params.eventId, body as EventData);
            set.status = result ? 200 : 404;
            return {
                data: result
            } as ApiResponse<string>;
        },
        {
            body: t.Object({
                name: t.String({ description: "Nome do evento" }),
                date: t.String({ description: "Data do evento" }),
                location: t.String({ description: "Localização do evento" }),
            }),
            detail: {
                summary: "Alterar evento por ID",
                description: "Altera os detalhes de um evento específico usando seu ID",
                tags: ["Eventos"],
            }
        }
    );

const deleteEventByIdRoute = new Elysia({prefix: "/api/events"})
    .delete(
        "/:eventId",
        async ({ params, set }) => {
            const result = await deleteEventByIdController.handle({ payload: params.eventId });
            set.status = result ? 204 : 404;
            return {
                data: result
            } as ApiResponse<string>;
        },
        {
            detail: {
                summary: "Deletar evento por ID",
                description: "Deleta um evento específico do sistema usando seu ID",
                tags: ["Eventos"],
            }
        }
    );

export const EventRoutes = {
    createUserRoute,
    getAllEventsRoutes,
    alterEventRoute,
    deleteEventByIdRoute
};