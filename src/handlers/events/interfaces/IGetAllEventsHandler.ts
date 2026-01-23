import { Events } from "../../../domain/Event";

export interface IGetAllEventsHandler {
    getAllEvents(): Promise<Events[] | null>;
}