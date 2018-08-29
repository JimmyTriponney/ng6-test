import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConcessionService } from '../../../services/concession.service';
import { Router } from '@angular/router';
import { Concession } from '../../../models/concession.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  userForm : FormGroup;
  formError: any;
  brand: string[] = [];
  entity: string[] = [];

  shop: Concession[] = [];
  shopSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private concessionService: ConcessionService,
              private route: Router) { }

  ngOnInit() {
    this.initForm();
    this.shopSubscription = this.concessionService.concessionSubject.subscribe( c => this.shop = c );
    this.concessionService.emitConcession();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      post: ['', [Validators.required] ],
      mail: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      phoneInside: ['', [Validators.required]],
      entity: this.formBuilder.array([]),
      brand: this.formBuilder.array([]),
      shop: this.formBuilder.array([]),
      role: ['']
    });
  }




  getEntity() {
    return this.userForm.get('entity') as FormArray;
  }
  
  getBrand() {
    return this.userForm.get('brand') as FormArray;
  }

  getShop() {
    return this.userForm.get('shop') as FormArray;
  }


  onAddEntity() {
    const newEntityControl = this.formBuilder.control(null, Validators.required);
    this.getEntity().push(newEntityControl);
  }

  onAddBrand() {
    const newBrandControl = this.formBuilder.control(null, Validators.required);
    this.getBrand().push(newBrandControl);
  }

  onAddShop() {
    const newShopControl = this.formBuilder.control(null, Validators.required);
    this.getShop().push(newShopControl);
  }

  
  onDeleteEntity(id: number) {
    this.getEntity().controls.splice(id,1);
  }

  onDeleteBrand(id: number) {
    this.getBrand().controls.splice(id,1);
  }

  onDeleteShop(id: number) {
    this.getShop().controls.splice(id,1);
  }



  onSubmitForm(){
  }

  onCheckBoxClick(prop, value){
    const index = prop.indexOf(value);
    if (index > -1){
      prop.splice(index,1);
    }
    else{
      prop.push(value);
    }
  }

  hydrateForm(){
    let value = this.userForm.value;
    value['brand'] = this.brand;
    value['entity'] = this.entity;
  }

  get formIsValid(){
    this.hydrateForm();

    const value = this.userForm.value;
    
    if (!value['brand'].length) {
      return false;
    }
    if (!value['entity'].length) {
      return false;
    }

    return true;
  }

  ngOnDestroy() {
    this.shopSubscription.unsubscribe();
  }

}
