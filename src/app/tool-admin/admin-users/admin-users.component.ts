import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  users: User[];
  search: string;

  userSubscription: Subscription;

  constructor(private userService: UserService,
              private searchService: SearchService) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe( user => { this.users = user } );
    this.userService.emitUser();
  }

  onKeyup() {
    this.searchService.onSearch(this.users, this.search);
  }

  onClick() {
    this.searchService.onSearch(this.users, this.search);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
