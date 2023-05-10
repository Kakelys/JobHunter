export class Reply {
  id: number;
  date: Date;
  status: string;
  vacancy: {
      id: number;
      title: string;
  }
  account: {
      id: number;
      name: string;
  }
}
