import { Concession } from '../models/concession.model';
import { Subject } from 'rxjs';

export class ConcessionService
{
    /*Partie test */
    /* Création d'un model de concession sans l'id ni la ville */
    concession: Concession[] = [];

    concessionSubject = new Subject<Concession[]>();

    emitConcession() {
        this.concessionSubject.next(this.concession);
    }

    constructor() {
        for (let i = 0; i < 11; i++) {
            const newConcession = new Concession({
                id: this.genId(),
                brand: i % 2 ? 'Volkswagen' : 'Audi',
                phone: i % 2 ? '03 86 42 03 03' : '01 75 45 45 12',
                phoneInside: i % 2 ? '1100' : '2200',
                zip: i % 2 ? '89000' : '77100',
                city: i % 2 ? 'Auxerre' : 'Meaux',
                adress: i % 2 ? '40 av. Charles de Gaulle' : '22 rue Tantin'
            });
            this.concession.push(newConcession);
        }
        this.emitConcession();
    }

    genId() {
        let lgh = this.concession.length;
        if(!this.concession.length) { return 0; }
        return this.concession[--lgh].id + 1;
    }

    addConcession(concession: Concession) {
        this.concession.push(concession);
        this.emitConcession();
    }

    getOneById(id: number) {
        return this.concession.find( (concession: Concession) => +concession.id === +id );
    }
}