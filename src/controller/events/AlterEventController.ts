import { EventData, EventDataWithStatus } from "../../domain/Event";
import { IAlterEventHandler } from "../../handlers/events/interfaces/IAlterEventHandler";

export class AlterEventController {

    constructor(private alterEventHandler: IAlterEventHandler) { }

    async handle(eventId: string, updates: EventData): Promise<string> {
        const result = await this.alterEventHandler.alterEvent(eventId, updates);
        if (!result) {
            return "Failed to alter event";
        }
        return "Event altered successfully";
    }
}