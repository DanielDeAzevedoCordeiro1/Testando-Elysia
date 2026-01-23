import { Events } from "../../../domain/Event";
import { EventRepository } from "../../../repositories/EventRepository";
import { IGetAllEventsHandler } from "../interfaces/IGetAllEventsHandler";

export class GetAllEventsHandlerImpl implements IGetAllEventsHandler {

    constructor(private repository: EventRepository) {}

    getAllEvents(): Promise<Events[] | null> {
        return this.repository.findAllEvents();
    }
}