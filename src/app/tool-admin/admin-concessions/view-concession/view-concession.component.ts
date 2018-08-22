import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Concession } from '../../../models/concession.model';
import { ConcessionService } from '../../../services/concession.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-concession',
  templateUrl: './view-concession.component.html',
  styleUrls: ['./view-concession.component.scss']
})
export class ViewConcessionComponent implements OnInit, OnDestroy {

  id: number;
  concession: Concession;
  urlAdresse: string;
  concessionSubscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private concessionService: ConcessionService) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.concessionSubscription = this.concessionService.concessionSubject.subscribe(
      concession => this.concession = concession.find( c => c.id === this.id )
    );
    this.concessionService.emitConcession();
    this.urlAdresse = encodeURI(this.concession.adress + ' ' + this.concession.zip + ' ' + this.concession.city);
  }

  ngOnDestroy(){
    this.concessionSubscription.unsubscribe();
  }

}
