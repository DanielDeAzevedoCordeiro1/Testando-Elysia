import { EventData, Events } from "../../../domain/Event";

export interface ICreateEventHandler {
    createEvent(payload: EventData): Promise<Events>;
}