import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations';
import { MenuService } from '../services/menu.service';
import { Subscription } from 'rxjs';
import { Menu } from '../models/menu.model';
import { RouterState } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    //Animation du menu
    trigger('menuAnim',[
      state('show',
        style({
          width: '*',
          height: '*',
          display: '*',
          transform: 'scale(1)'
        })),
      state('hide',
        style({
          transform: 'scale(0)',
          display: 'none'
        })),
      transition( 'show => hide', animate(250, 
        keyframes([
          style({height: 0, transform: 'scale(0)', offset: 0.9}),
          style({display: 'none', offset: 1})
        ]))),
      transition( 'hide => show', animate(250, 
        keyframes([
          style({display: '*', offset: 0.1}),
          style({height: '*', transform: 'scale(1)', offset: 1})
        ]))),
    ]),
    trigger('crossBottom',[
      state('show',
        style({
          transform: 'rotate(45deg)'
        })),
      state('hide',
        style({
          transform: 'rotate(0)'
        })),
      transition('hide <=> show', animate(100))
    ]),
    trigger('crossTop',[
      state('show',
        style({
          transform: 'rotate(-45deg)'
        })),
      state('hide',
        style({
          transform: 'rotate(0)'
        })),
      transition('hide <=> show', animate(100))
    ]),
    trigger('stripeNoAnim',[
      state('hide',
        style({
          opacity: 1
        })),
      state('show',
        style({
          opacity: 0
        })),
      transition('hide => show', animate(50)),
      transition('show => hide', animate('50ms 50ms'))
    ]),
    trigger('circleCross',[
      state('show',
        style({
          'borderRadius': '*'
        })),
      state('hide',
        style({
          'borderRadius': '40px'
        })),
      transition('show <=> hide', animate(100))
    ])
  ]
})
export class MenuComponent implements OnInit, OnDestroy {

  state: string = 'hide';
  @Input() title: string;

  menus: Menu[] = [];

  menusSubscription: Subscription;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menusSubscription = this.menuService.menusSubject.subscribe( ms => this.menus = ms );
    this.menuService.emitMenus();
  }

  onClick(): void{
    this.menuService.onClickSection();
    this.state = this.state === 'show' ? 'hide' : 'show';
  }

  ngOnDestroy(){
    this.menusSubscription.unsubscribe();
  }

  onClickItem(data){
    this.state = data;
    console.log(data);
  }

}
