import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private _httpClient:HttpClient) { }
  

  getAllCarts(param?:any){
    let params  = new HttpParams();
    params = params.append("startDate",param?.start).append("endDate",param?.end);
    return this._httpClient.get("https://fakestoreapi.com/" + "carts",{params:params})
  }

  deleteCart(id:number){
    return this._httpClient.delete("https://fakestoreapi.com/" + "carts/" + id);
  }
}
