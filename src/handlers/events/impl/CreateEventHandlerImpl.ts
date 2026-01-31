import { EventData, Events } from "../../../domain/Event";
import { EventRepository } from "../../../repositories/EventRepository";
import { ICreateEventHandler } from "../interfaces/ICreateEventHandler";

export class CreateEventHandlerImpl implements ICreateEventHandler {
    constructor(private repository: EventRepository) {}

    async createEvent(payload: EventData): Promise<Events> {
        const event = await this.repository.createEvent(payload);
        return event;
    }
}