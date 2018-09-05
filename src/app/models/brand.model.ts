export class Brand {

    id: number;
    name: string;

    constructor(data){
        this.id = data.id ? data.id : 0;
        this.name = data.name ? data.name : '';
    }
}