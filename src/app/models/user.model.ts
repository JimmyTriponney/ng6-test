import { Concession } from "./concession.model";

export class User
{
    id: number;
    firstname: string;
    lastname: string;
    post: string;
    mail: string;
    mobile: string;
    phoneInside: string;
    entity: any[];
    brand: any[];
    shop: Concession[];
    role: string;

    isHide = false;

    constructor(data){
        this.id = data.id ? data.id : -1;
        this.firstname = data.firstname ? data.firstname : '';
        this.lastname = data.lastname ? data.lastname : '';
        this.post = data.post ? data.post : '';
        this.mail = data.mail ? data.mail : '';
        this.mobile = data.mobile ? data.mobile : '';
        this.phoneInside = data.phoneInside ? data.phoneInside : '';
        this.entity = data.entity ? data.entity : [];
        this.brand = data.brand ? data.brand : [];
        this.shop = data.shop ? data.shop : [];
        this.role = data.role ? data.role : 'GUEST';
    }
}