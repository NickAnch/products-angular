import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CreateResponse, Product } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAll(): Observable<Product[]> {
    return this.http.get(`${environment.dbUrl}/products.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object.keys(response).map((key: string) => ({ ...response[key], id: key }));
      }));
  }

  public create(product: Product): Observable<Product> {
    return this.http.post(`${environment.dbUrl}/products.json`, product)
      .pipe(map((response: CreateResponse) => ({ ...product, id: response.name })));
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(`${environment.dbUrl}/products/${id}.json`);
  }

  public edit(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.dbUrl}/products/${product.id}.json`, product);
  }

  public getById(id: string): Observable<Product> {
    return this.http.get(`${environment.dbUrl}/products/${id}.json`)
      .pipe(map((product: Product) => ({ ...product, id })));;
  }

}
