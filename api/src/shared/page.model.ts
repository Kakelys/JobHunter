export class Page {
    page: number;
    toTake: number;

    constructor(page: number, toTake: number) {
        this.page = page ?? 1;
        this.toTake = toTake ?? 30;
        
        if(this.toTake > 100)
            this.toTake = 100;

        if(this.page < 1)
            this.page = 1;
    }
}