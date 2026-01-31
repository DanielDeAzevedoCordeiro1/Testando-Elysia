import { IDeleteEventByIdHandler } from "../../handlers/events/interfaces/IDeleteEventByIdHandler";
import { ApiRequest } from "../../types/ApiRequest";

export class DeleteEventByIdController {
    constructor(private deleteEventByIdHandler: IDeleteEventByIdHandler) {}

    async handle(request: ApiRequest<string> ): Promise<string> {
        const isSuccess = await this.deleteEventByIdHandler.deleteEventById(request.payload);
        if (!isSuccess) {
            return "Failed to delete event";
        }
        return "Event deleted successfully";
    }
}