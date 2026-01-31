import { EventData, EventDataWithStatus } from '../../../domain/Event';
import { EventRepository } from "../../../repositories/EventRepository";
import { IAlterEventHandler } from "../interfaces/IAlterEventHandler";

export class AlterEventHandlerImpl implements IAlterEventHandler {

    constructor(private repository: EventRepository ) { }

    async alterEvent(eventId: string, updates: EventData): Promise<boolean> {
        const alteredEvent = await this.repository.alterEvent(eventId, updates);
        if (!alteredEvent) {
            throw new Error("Event not found");
        }
        return true;
    }
}