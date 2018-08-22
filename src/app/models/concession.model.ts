export class Concession
{
    public id: number;
    public isHide = false;
    public entity: string = 'Jeannin Automobiles';
    public brand: string | string[];
    public city: string;
    public phone: string;
    public phoneInside: string;
    public adress: string;
    public zip: string;

    constructor(data){
        this.id = data.id;
        this.brand = data.brand;
        this.city = data.city;
        this.phone = data.phone;
        this.entity = data.entity;
        this.phoneInside = data.phoneInside;
        this.adress = data.adress;
        this.zip = data.zip;
    }
}