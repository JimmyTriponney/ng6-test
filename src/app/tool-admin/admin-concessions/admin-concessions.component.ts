import { Component, OnInit, OnDestroy } from '@angular/core';
import { Concession } from '../../models/concession.model';
import { Subscription } from 'rxjs';
import { ConcessionService } from '../../services/concession.service';

@Component({
  selector: 'app-admin-concessions',
  templateUrl: './admin-concessions.component.html',
  styleUrls: ['./admin-concessions.component.scss']
})
export class AdminConcessionsComponent implements OnInit, OnDestroy {

  search: string;
  countSearch: number = 0;

  concessions: Concession[];

  concessionSubscription: Subscription;

  constructor(private concessionService: ConcessionService) { }

  ngOnInit() {
    this.concessionSubscription = this.concessionService.concessionSubject.subscribe( concession => this.concessions = concession );
    this.concessionService.emitConcession();
  }

  onKeyup(): void{
    this.onSearch();
  }

  onClick(): void{
    this.onSearch();
  }

  onSearch(): void{
    this.concessions.map( concession => {
      if(this.search.length > 0){
        for(let info in concession){
          if(typeof concession[info] === 'string' && concession[info] === this.search ){
            concession.isHide = true;
            this.countSearch += 1;
          }
        }
      }
      else{
        concession.isHide = false;
      }
    });

    if(this.countSearch){
      this.concessions.map( c => { c.isHide = !c.isHide; });
    }
    else{
      this.concessions.map( c => { c.isHide = false; });
    }

    this.countSearch = 0;
  }

  ngOnDestroy(){
    this.concessionSubscription.unsubscribe();
  }

}
