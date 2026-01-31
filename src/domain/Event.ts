export type EventData = Omit<Events, "id" | "isProcessed">;
export type EventDataWithStatus = Omit<Events, "id">;

export interface Events {
    id: string;
    name: string;
    date: string;
    isProcessed: boolean;
    location: string;
}