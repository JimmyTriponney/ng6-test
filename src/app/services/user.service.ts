import { User } from '../models/user.model';
import { Subject } from 'rxjs';

export class UserService
{
    user: User[] = [];

    userSubject = new Subject<User[]>();

    emitUser() {
        this.userSubject.next( this.user );
    }

    constructor() {
        const userType1 = {
            firstname: 'Jimmy',
            lastname: 'Triponney',
            post: 'Web Developper',
            mail: 'j.triponney@jeannin-automobiles.com',
            mobile: '0665584373',
            phoneInside: '1105',
            entity: ['AMSI'],
            role: 'ADMIN'
        };
        const userType2 = {
            firstname: 'Sophie',
            lastname: 'Sanchez',
            post: 'Responsable marketing',
            mail: 's.sanchez@jeannin-automobiles.com',
            mobile: '0665584373',
            phoneInside: '1105',
            entity: ['AMSI'],
            role: 'ADMIN'
        };

        for ( let i = 0; i < 11; i++ ) {
            if ( i % 2 ){
                this.user.push( new User( userType1 ) );
            }
            else {
                this.user.push( new User( userType2 ) );
            }
        }

        this.emitUser();
    }

    genId() {
        let lgh = this.user.length;
        if(!this.user.length) { return 0; }
        return this.user[--lgh].id + 1;
    }
}