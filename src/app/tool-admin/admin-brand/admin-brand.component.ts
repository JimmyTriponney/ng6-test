import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Subscription } from 'rxjs';
import { Brand } from '../../models/brand.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.scss']
})
export class AdminBrandComponent implements OnInit, OnDestroy {

  brand: Brand[] = [];
  brandSubscription: Subscription;
  search: string;

  constructor(private brandService: BrandService,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.brandSubscription = this.brandService.brandSubject.subscribe( brand => this.brand = brand );
    this.brandService.emitBrand();
  }

  onKeyup(): void {
    this.searchService.onSearch(this.brand, this.search);
  }

  onClick(): void {
    this.searchService.onSearch(this.brand, this.search);
  }

  onDelete(id: number) {
    this.brandService.deleteBrand(id);
  }

  ngOnDestroy(): void {
    this.brandSubscription.unsubscribe();
  }

}
