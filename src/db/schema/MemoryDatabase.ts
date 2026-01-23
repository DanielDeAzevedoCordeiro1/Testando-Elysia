import { Events } from "../../domain/Event";

export interface MemoryDatabase {
    db: Array<Events>;
}