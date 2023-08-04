import { Injectable} from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()

export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Burger 1', 'Bigg Burger','https://img.freepik.com/free-photo/double-hamburger-isolated-white-background-fresh-burger-fast-food-with-beef-cream-cheese_90220-1192.jpg?w=2000',[
            new Ingredient('Bun',2),
            new Ingredient('Patty',2),
            new Ingredient('Cheese',1),
            new Ingredient('Tomato',1),
            new Ingredient('Onion',1),
        ]),
        new Recipe('Pizza', 'A Test Recipe Pizza','https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQcHbxCjB7FY6Rttw1VZFdh0gIZmm4MLLjfmD0dhA11saxBKG_D49VVkmlvz3sE71-b',[
            new Ingredient('Pizza Base', 1),
            new Ingredient('Tomato', 1),
            new Ingredient('Cheese', 1),
            new Ingredient('Onion', 1),
            new Ingredient('Pepperoni', 1),

        ]),
      ]; 
      constructor( private slService: ShoppingListService) {}
    getRecipe() {
        return this.recipes.slice();
    }
    getRecipes(index: number) {
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}