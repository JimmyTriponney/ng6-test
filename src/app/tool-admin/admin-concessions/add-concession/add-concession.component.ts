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
              private route: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.concessionForm = this.formBuilder.group({
      brand: [''],
      entity: [''],
      city: ['', [Validators.required] ],
      adress: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phoneInside: ['']
    });
  }

  onSubmitForm(){
    const value = this.concessionForm.value;
    this.hydrateForm();
    let concession = new Concession({
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
    this.route.navigate(['tool/admin/concession']);
  }

  onCheckBoxClick(prop, value) {
    let index = prop.indexOf(value);
    if (index > -1) {
      prop.splice(index, 1);
    }
    else {
      prop.push(value);
    }
  }

  hydrateForm(){
    let value = this.concessionForm.value;
    value['brand'] = this.brand;
    value['entity'] = this.entity;
  }

  get formIsValid() {
    this.hydrateForm();

    const value = this.concessionForm.value;

    if (!value['brand'].length) {
      return false;
    }
    if (!value['entity'].length) {
      return false;
    }

    return true;
  }

}
