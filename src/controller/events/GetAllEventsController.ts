import { Events } from "../../domain/Event";
import { GetAllEventsHandlerImpl } from "../../handlers/events/impl/GetAllEventsHandlerImpl";

export class GetAllEventsController {
    constructor(private handler: GetAllEventsHandlerImpl) { }

    async handleRequest(): Promise<Events[] | null> {
        const events = await this.handler.getAllEvents();
        return events;
    }
}