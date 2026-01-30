import { EventRepository } from "../../../repositories/EventRepository";
import { IDeleteEventByIdHandler } from "../interfaces/IDeleteEventByIdHandler";

export class DeleteEventByIdHandlerImpl implements IDeleteEventByIdHandler {

    constructor(private repository: EventRepository) {}

    async deleteEventById(eventId: string): Promise<boolean> {
        const eventExists = await this.repository.getEventById(eventId);
        if (!eventExists) {
            throw new Error("Event not found");
        }
        return await this.repository.deleteEvent(eventId);
    }
}