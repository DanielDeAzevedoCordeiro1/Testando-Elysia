import { IDeleteEventByIdHandler } from "../../handlers/events/interfaces/IDeleteEventByIdHandler";

export class DeleteEventByIdController {
    constructor(private deleteEventByIdHandler: IDeleteEventByIdHandler) {}

    async handle(eventId: string): Promise<string> {
        const isSuccess = await this.deleteEventByIdHandler.deleteEventById(eventId);
        if (!isSuccess) {
            return "Failed to delete event";
        }
        return "Event deleted successfully";
    }
}