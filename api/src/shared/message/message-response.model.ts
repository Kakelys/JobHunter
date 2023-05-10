export class MessageResponse {
    id: number;
    text: string;
    date: Date;
    from: {
        id: number;
        name: string;
    }
}