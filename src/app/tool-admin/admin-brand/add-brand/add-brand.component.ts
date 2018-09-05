import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../models/brand.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  brandForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private brandService: BrandService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const value = this.brandForm.value;
    const newBrand = new Brand({
      name: value['name']
    });

    this.brandService.addBrand(newBrand);
    this.router.navigate(['tool/admin/brand']);
  }

}
