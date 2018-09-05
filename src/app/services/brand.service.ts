import { Brand } from '../models/brand.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamService } from './param.service';

@Injectable()

export class BrandService
{
    brand: Brand[] = [];
    brandSubject = new Subject<Brand[]>();

    httpOption = {
        headers: new HttpHeaders({
            'Content-Type' : 'application/json; charset=UTF-8',
            'credentials': 'include'
        })
    };

    constructor(private http: HttpClient,
                private paramService: ParamService){

        this.http.get(
            this.paramService.apiUrl + 'brand/get'
        ).subscribe(
            response => {
                if( response.status === 200 ){
                    for( const data of response.data){
                        this.brand.push(
                            new Brand({
                                id: data.id,
                                name: data.name
                            })
                        );
                    }
                }
            }
        );

    }

    emitBrand() {
        this.brandSubject.next( this.brand );
    }

    genId() {
        let lgh = this.brand.length;
        if(!this.brand.length) { return 0; }
        return this.brand[--lgh].id + 1;
    }

    addBrand(brand: Brand) {

        /* Envoi de la nouvelle marque au serveur */
        this.http.post(
            this.paramService.apiUrl + 'brand/add',
            JSON.stringify(brand) ).subscribe(
                response => brand.id = response.id
            );

        this.brand.push(brand);
        this.emitBrand();
    }

    deleteBrand(id: number) {

        this.http.get(
            this.paramService.apiUrl + 'brand/delete/' + (+id),
        ).subscribe(
            response => {
                const idDelete = response.id;
                const brandIndex = this.brand.findIndex( brand => brand.id === idDelete );
                this.brand.splice(brandIndex, 1);
                this.emitBrand();
            }
        );
    }
}