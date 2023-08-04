import {EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 3)
      ];
    getIngredient() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
        console.log(this.ingredients);
        
    }
    addIngredients(ingredients: Ingredient[]) {
        // for( let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
        console.log(this.ingredients);

    }
}