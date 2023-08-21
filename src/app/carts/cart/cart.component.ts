import { Component,OnInit } from '@angular/core';
import { CartsService } from '../carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  carts:any[] = [];
  details:any ={}
  products:any[] = [];
  form!:FormGroup;
  total:any = 0;

  constructor(private _service:CartsService,private build:FormBuilder, private _prod:ProductsService){

  }
  ngOnInit(){
    this.getCart();
    this.form = this.build.group({
      start:[''],
      end:['']
    })
  }
  
  getCart(){
    this._service.getAllCarts().subscribe((respone:any)=>{
      this.carts = respone;
    })
  }
  apply(){
    let date = this.form.value;
    this._service.getAllCarts(date).subscribe((respone:any)=>{
      this.carts = respone;
      console.log(respone);
    })
  }

  deleteCart(id:number){
    this._service.deleteCart(id).subscribe((respone)=>{
      this.getCart();
      alert("Cart Deleted");
    })
  }
  view(index:any){
    this.products = []; 
    this.details = this.carts[index];
    for(let x in this.details.products){
      this._prod.getIdProduct(this.details.products[x].productId).subscribe((respone)=>{
        this.products.push({item:respone,quantity:this.details.products[x].quantity});
        this.getTotal(this.products);
      })
    }
  }

  getTotal(paramProduct:any){
    this.total = 0;
    for(let prod in paramProduct){
      this.total += paramProduct[prod].item.price * paramProduct[prod].quantity;
    }
  }
}
