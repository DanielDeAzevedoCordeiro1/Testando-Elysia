import { EventData, Events } from "../domain/Event";

export interface EventRepository{
    findAllEvents(): Promise<Events[] | null>;
    getEventById(eventId: string): Promise<Events | null>;
    createEvent(event: EventData): Promise<Events>;
    deleteEvent(eventId: string): Promise<boolean>;
}