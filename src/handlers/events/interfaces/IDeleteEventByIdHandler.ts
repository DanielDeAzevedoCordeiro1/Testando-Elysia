export interface IDeleteEventByIdHandler {
    deleteEventById(eventId: string): Promise<boolean>;
}