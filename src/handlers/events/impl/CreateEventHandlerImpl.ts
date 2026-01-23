import { EventData, Events } from "../../../domain/Event";
import { EventRepository } from "../../../repositories/EventRepository";

export class CreateEventHandlerImpl {
    constructor(private repository: EventRepository) {}

    async createEvent(payload: EventData): Promise<Events> {
        const event = await this.repository.createEvent(payload);
        return event;
    }
}