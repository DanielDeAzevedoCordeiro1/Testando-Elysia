import { EventData, EventDataWithStatus } from "../../../domain/Event";

export interface IAlterEventHandler {
    alterEvent(eventId: string, updates: EventData): Promise<boolean>;
}