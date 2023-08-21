import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }
  getProducts(){
    return this._httpClient.get("https://fakestoreapi.com/" + 'products');
  }

  getCategories(){
    return this._httpClient.get("https://fakestoreapi.com/" + 'products/categories');
  }

  getByCategory(key:string){
    return this._httpClient.get("https://fakestoreapi.com/" + 'products/category/' + key);
  }

  getIdProduct(id:any){
    return this._httpClient.get("https://fakestoreapi.com/" + 'products/' + id);
  }

  createProduct(model:any){
    return this._httpClient.post("https://fakestoreapi.com/" + 'products' , model);
  }

  updateProduct(id:any,productData: any){
    return this._httpClient.patch("https://fakestoreapi.com/" + 'products/' +id, productData);
  }
}
