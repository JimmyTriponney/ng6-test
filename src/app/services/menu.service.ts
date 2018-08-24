import { Subject } from 'rxjs';
import { Menu } from '../models/menu.model';

export class MenuService {
    menus = [
        new Menu({
        id: 0,
        section: 'Outils administrateur',
        state: 'hide',
        items: [
            {
                classIcon: 'far fa-building',
                name: 'Concessions',
                link: '/tool/admin/concession'
            },// Fin de l'item
            {
                classIcon: 'far fa-user-circle',
                name: 'Utilisateurs',
                link: '/tool/admin/user'
            },// Fin de l'item
            {
                classIcon: 'far fa-user-circle',
                name: 'Utilisateurs',
                link: ''
            },// Fin de l'item
            {
                classIcon: 'far fa-user-circle',
                name: 'Utilisateurs',
                link: ''
            }// Fin de l'item
        ]
    })//Fin de la section
    ];

    menusSubject = new Subject<Menu[]>();

    emitMenus(){
        this.menusSubject.next(this.menus);
    }

    onClickSection(id?: number): void{
        this.menus.map( (section) => {
            if( id === undefined ){
                section.state = 'hide';
            }
            else if( section.id === id ){
                section.state = section.state === 'show' ? 'hide' : 'show';
            }
            else if( section.state === 'show' ){
                section.state = 'hide';
            }
        });
        this.emitMenus();
    }
}