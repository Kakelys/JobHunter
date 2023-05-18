export class InviteResponse {
    id: number;
    date: Date; 
    inviter?: {
        id: number;
        name: string;
    };
    company?: {
        id: number;
        name: string;
    };
    account?: {
        id: number,
        name: string;
    }
}