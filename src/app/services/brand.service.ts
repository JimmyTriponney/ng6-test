import { Brand } from '../models/brand.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()

export class BrandService implements OnInit
{
    brand: Brand[] = [];
    brandSubject = new Subject<Brand[]>();

    httpOption = {
        headers: new HttpHeaders({
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            'credentials': 'include'
        })
    };

    constructor(private http: HttpClient){
        const brandType = {
            id: 0,
            name: 'Volkswagen',
            logo: 'http://marque-voiture.com/wp-content/uploads/2015/10/logo-Volkswagen.png'
        };

        for (let i = 0; i < 11; i++) {
            brandType.id = i;
            this.brand.push( new Brand(brandType) );
        }
    }

    ngOnInit() {
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
        return this.http.post('http://localhost:5800/brand/add', brand, this.httpOption);
    }

    uploadLogo(file: File) {
        console.log(file);

        return this.http.post('http://localhost:5800/brand/add', file, this.httpOption);
    }


}