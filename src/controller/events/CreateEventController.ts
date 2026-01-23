import { EventData, Events } from "../../domain/Event";
import { ICreateEventHandler } from "../../handlers/events/interfaces/ICreateEventHandler";
import { ApiRequest } from "../../types/ApiRequest";

export class CreateEventController {
    constructor(private handler: ICreateEventHandler) {}

    async handleRequest(request: ApiRequest<EventData>): Promise<Events> {
        const event = await this.handler.createEvent(request.payload);
        return event;
    }
}