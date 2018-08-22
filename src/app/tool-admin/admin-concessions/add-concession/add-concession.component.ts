import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConcessionService } from '../../../services/concession.service';
import { Concession } from '../../../models/concession.model';
import { Router } from '@angular/router';
import { ValidatorForm } from '../../../services/validatorForm.service';

@Component({
  selector: 'app-add-concession',
  templateUrl: './add-concession.component.html',
  styleUrls: ['./add-concession.component.scss']
})
export class AddConcessionComponent implements OnInit {

  concessionForm : FormGroup;
  formError: any;
  brand: string[] = [];
  entity: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private concessionService: ConcessionService,
              private route: Router,
              private validate: ValidatorForm) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.concessionForm = this.formBuilder.group({
      brand: [''],
      entity: [''],
      city: [''],
      adress: [''],
      zip: [''],
      phone: [''],
      phoneInside: ['']
    });
  }

  onSubmitForm(){
    const value = this.concessionForm.value;
    console.log( value['brand'] );
    console.log( this.concessionForm.invalid );
    console.log( this.concessionForm.controls.brand.errors );
    /*let concession = new Concession({
      id: this.concessionService.genId(),
      brand: value['brand'],
      city: value['city'],
      phone: value['phone'],
      entity: value['entity'],
      phoneInside: value['phoneInside'],
      adress: value['adress'],
      zip: value['zip']
    });
    this.concessionService.addConcession(concession);
    this.concessionService.emitConcession();
    this.route.navigate(['tool/admin/concession']);*/
  }

  onCheckBoxClick(prop, value){
    let index = prop.indexOf(value);
    if (index > -1){
      prop.splice(index,1);
    }
    else{
      prop.push(value);
    }
  }

  hydrateForm(){
    let value = this.concessionForm.value;
    value['brand'] = this.brand;
    value['entity'] = this.entity;
  }

  /* TEST DE CREATION D'UNE FONCTION DE VALIDATION */
  dataV: any[] = [
    ['entity','required'],
    ['brand', ['required']],
    ['adress', 'required']
  ];

  get formIsValid(){
    this.hydrateForm();

    /* Test du service de validation maison */
    let test = this.validate.check(this.concessionForm, this.dataV);
    this.formError = this.validate.messageOut ;
    console.log(this.formError);
    console.log(this.validate.messageOut);
    return test;
  }

  hasOwnProperty(obj, prop){
    return this.formError.hasOwnProperty(prop);
  }
}
