import { Component, OnInit, OnDestroy } from '@angular/core';
import { Concession } from '../../models/concession.model';
import { Subscription } from 'rxjs';
import { ConcessionService } from '../../services/concession.service';
import { SearchService } from '../../services/search.service';

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

  constructor(private concessionService: ConcessionService
              private searchService: SearchService) { }

  ngOnInit() {
    this.concessionSubscription = this.concessionService.concessionSubject.subscribe( concession => this.concessions = concession );
    this.concessionService.emitConcession();
  }

  onKeyup() {
    this.searchService.onSearch(this.concessions, this.search);
  }

  onClick() {
    this.searchService.onSearch(this.concessions, this.search);
  }
  
  ngOnDestroy(){
    this.concessionSubscription.unsubscribe();
  }

}
