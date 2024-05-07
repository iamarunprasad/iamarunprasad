
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../models/restaurant';
import { MerchantService } from '../services/merchant.service';
import { Dish } from '../models/dishes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.css'
})
export class AddDishComponent {
  userForm!: FormGroup;
  restaurants: Restaurant[] = [];

  constructor(private fb: FormBuilder, private ms: MerchantService,public snackbar: MatSnackBar, public route: Router) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      restId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dishID: ['', Validators.required,Validators.pattern('^[0-9]+$')],
      dishname: ['', Validators.required,Validators.pattern('^[a-zA-Z ]*$')],
      category: ['', Validators.required,Validators.pattern('^[a-zA-Z ]*$')],
      price: ['', [Validators.required, Validators.pattern('^[0-9]{1,5}$')]],
      rating: ['', Validators.required,Validators.pattern('^[0-9]+$')]
    });


    this.fetchRestaurants(); // Fetch existing restaurants for dropdown
  }

  get restId(){
    return this.userForm.get("restId");
  }

  get dishID(){
    return this.userForm.get("dishID");
  }

  get dishname(){
    return this.userForm.get("dishname");

  }
  
get category(){
  return this.userForm.get("category");
}

get price(){
  return this.userForm.get("price");
}

get rating(){
  return this.userForm.get("rating");
}





  fetchRestaurants() {
    this.ms.merchantRestaurant().subscribe(
      (response: Restaurant[]) => {
        this.restaurants = response;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }
  submitForm() {
    const restaurantId = this.userForm.get('restId')?.value;
    const dishes = this.userForm.value;
    this.addDishes(restaurantId, dishes);
  }
  addDishes(restaurantId: string, dishes: Dish[]) {
    // console.log('Token:', this.ms.getToken());
    this.ms.addDish(restaurantId, dishes).subscribe(
      (response) => {
   this.openSnackBar("Dish added successfully");
       this.route.navigateByUrl('\ViewMyRestaurants');
      },
      (error) => {
        console.error('Error adding dishes:', error);
               this.openSnackBar("dish already exist");
      }
    );
  }

  canClose() {
    if (this.userForm.dirty) {
      let display = confirm("Changes you have made may not be saved! Please confirm");
      return display;
    }
    else {
      return true;
    }
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000 
    });
  }

     }