export class Message {
  id: number;
  text: string;
  date: Date;
  from: {
      id: number;
      name: string;
  }
  to?: {
    id: number;
    name: string;
  }
}
