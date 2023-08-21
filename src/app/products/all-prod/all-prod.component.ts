import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-prod',
  templateUrl: './all-prod.component.html',
  styleUrls: ['./all-prod.component.scss']
})
export class AllProdComponent {
  products:any[] =[];
  categories:string[]= [];
  msg:string ="";
  loading:boolean = false
  cartProducts:any[] = [];
  base64:any ="";
  form!:FormGroup;
  constructor( private _productsService:ProductsService, private _form:FormBuilder){
  }

  ngOnInit():void{
    this.form = this._form.group({
      title: ['',[Validators.required]],
      price: ['',[Validators.required]],
      description: ['',[Validators.required]],
      image: ['',[Validators.required]],
      category: ['',[Validators.required]],
    })
    this.showProducts();
    this.showCategories();
  }
  showProducts(){ 
     this._productsService.getProducts().subscribe((response:any)=>{
              this.products = response;
              console.log(this.products);
    },
    error => {
      this.msg = error.message;
    })
  }

  showCategories(){ 
    this._productsService.getCategories().subscribe((response:any)=>{
             this.categories = response;
             console.log(this.categories);
   },
   error => {
     this.msg = error.message;
   })
 }
 filterCategories(event:any){
  let value = event.target.value;
  this.showCategory(value);
  if (value == 'all'){
    this.showProducts();
  }
 }
 showCategory(key:string){
  this._productsService.getByCategory(key).subscribe((response:any)=>{
    this.products = response;
  })}

  addToCart(event:any){
    if('cart' in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
      let exists = this.cartProducts.find(item => item.item.id == event.item.id )
      if (exists){
        alert("product put before !")
      } else{
        this.cartProducts.push(event);
        localStorage.setItem('cart',JSON.stringify(this.cartProducts));
      }
    }else{
      this.cartProducts.push(event);
      localStorage.setItem('cart',JSON.stringify(this.cartProducts));
    }
    }

    getImagePath(event:any){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //me.modelvalue = reader.result;
        this.base64 = reader.result;
        this.form.get('image')?.setValue(this.base64);
      };
    }

    addProduct(){
      const model = this.form.value;
      this._productsService.createProduct(model).subscribe((response)=>{
        alert("product added");
        this.products.push(model);
      })
    }

    getSelected(selectedCategory: any) {
      this.form.get('category')?.setValue(selectedCategory.target.value);
    }

    update(item:any){
      const updatedProductData = this.form.patchValue({
        title: item.title,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category,
      })
      this.base64 = item.image;

      const prodID = 7;
      this._productsService.updateProduct(prodID,updatedProductData).subscribe((response) => {
        console.log('Product updated:', response);
      });
    }

}
