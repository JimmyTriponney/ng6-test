export class Menu
{
    public id: number;
    public section: string;
    public state: string;
    public items: any[];

    constructor(data){
        this.id = data.id;
        this.section = data.section;
        this.state = data.state;
        this.items = data.items;
    }
}