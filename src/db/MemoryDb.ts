import { EventData, Events} from '../domain/Event';
import { EventRepository } from "../repositories/EventRepository";
import { MemoryDatabase } from './schema/MemoryDatabase';


export class MemoryDb implements EventRepository {

    private banco: MemoryDatabase = {
        db: []
    }
    async getEventById(eventId: string): Promise<Events | null> {

        return this.banco.db.find(event => event.id === eventId) || null;
    }

    async createEvent(event: EventData): Promise<Events> {

        const createdEvent: Events = {
            id: crypto.randomUUID(),
            name: event.name,
            date: event.date,
            isProcessed: false,
            location: event.location
        }

        this.banco.db.push(createdEvent);

        return createdEvent;
    }

    async findAllEvents(): Promise<Events[] | null> {
        return this.banco.db.length > 0 ? this.banco.db : null;
    }
        
    async deleteEvent(eventId: string): Promise<boolean> {
        const index = this.banco.db.findIndex(event => event.id === eventId);
        if (index !== -1) {
            this.banco.db.splice(index, 1);
            return true;
        }
        return false;
    }

    async alterEvent(eventId: string, updates: EventData): Promise<boolean> {
        const event = await this.getEventById(eventId);
        if (!event) {
            return false;
        }

        const updatedEvent = { ...event, ...updates };
        const index = this.banco.db.findIndex(e => e.id === eventId);
        this.banco.db[index] = updatedEvent;

        return true;
    }
}