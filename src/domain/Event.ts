export type EventData = Omit<Events, "id" | "isProcessed">;

export interface Events {
    id: string;
    name: string;
    date: string;
    isProcessed: boolean;
    location: string;
}