import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrls: ['./menu-section.component.scss'],
  animations: [
    //Animation des sections
    trigger('menuSectionAnim', [
      state('show',
        style({
          height: '*',
          display: '*'
        })),
      state('hide',
        style({
          height: 0,
          display: 'none'
        })),
      transition('hide => show', animate(500,
        keyframes([
          style({display: '*', offset: 0.1}),
          style({height: '*', offset: 1})
        ]))),
      transition('show => hide', animate(500,
        keyframes([
          style({height: 0, offset: 0.9}),
          style({display: 'none', offset: 1})
        ]))),
    ]),
    //Animation du chevron
    trigger('menuChevronAnim', [
      state('show',
        style({
          transform: 'rotate(90deg)'
        })),
      state('hide',
        style({
          transform: 'rotate(0deg)'
        })),
      transition('show <=> hide', animate(500))
    ])
  ]
})
export class MenuSectionComponent implements OnInit {

  @Input() state: string;
  @Input() items: any[];
  @Input() id: number;
  @Output() stateMenu: EventEmitter<string> = new EventEmitter();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

  onClick(){
    this.menuService.onClickSection(this.id);
  }

  onClickItem(data){
    this.stateMenu.emit(data);
    this.state = data;
  }

}
