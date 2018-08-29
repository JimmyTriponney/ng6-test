import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../models/brand.model';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  @ViewChild('fileUp')

  brandForm: FormGroup;
  test: any = 'Hello';




  constructor(private formBuilder: FormBuilder,
              private brandService: BrandService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });
  }

  onUploadFile(file: File): Promise<any> {

    const blob = file as Blob;

    console.log(blob);

    return new Promise(
      (resolve, reject) => {
        const formData: FormData = new FormData();
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        const url: string = 'http://localhost:5800/brand/add';

        formData.append('file', file);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
              resolve(xhr);
            } else {
              reject(xhr);
            }
          }
        };

        console.log( formData );

        xhr.open('POST', url, true); // configuration de l'objet XHR
        xhr.setRequestHeader('enctype', 'multipart/form-data'); // envoie avec FormData
        const tst = xhr.send(formData); // envoie de la requête

        console.log( tst );
      }
    );

    /*this.brandService.uploadLogo(file)
      .subscribe(
        rep => console.log(rep)
      );*/
  }

  onChangeFile(event) {
    const file = event.target.files[0];

    this.onUploadFile( event.target.files[0] );
  }

  onSubmitForm() {

    /*
    const value = this.brandForm.value;
    const newBrand = new Brand({
      id: this.brandService.genId(),
      name: value['name'],
      logo: value['logo']
    });

    const tst = this.brandService.addBrand(newBrand);

    tst
      .subscribe( rep => { this.test = rep; console.log(this.test); } );
    */
  }

  /* TEST UPLOAD */
  onUpload(event) {
    console.log(event);
  }
  /* TEST UPLOAD */

}
