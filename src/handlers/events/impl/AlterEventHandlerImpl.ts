import { fa } from 'zod/v4/locales';
import { EventData, EventDataWithStatus } from '../../../domain/Event';
import { EventRepository } from "../../../repositories/EventRepository";
import { IAlterEventHandler } from "../interfaces/IAlterEventHandler";

export class AlterEventHandlerImpl implements IAlterEventHandler {

    constructor(private repository: EventRepository ) { }

    async alterEvent(eventId: string, updates: EventData): Promise<boolean> {

        const updateExists = updates.name && updates.date && updates.location ? true : false;

        if (!updateExists) {
            return false;
        }

        const alteredEvent = await this.repository.alterEvent(eventId, updates);
        if (!alteredEvent) {
            return false;
        }
        return true;
    }
}