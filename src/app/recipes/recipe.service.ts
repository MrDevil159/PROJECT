import { Injectable} from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Burger 1', 'Bigg Burger','https://img.freepik.com/free-photo/double-hamburger-isolated-white-background-fresh-burger-fast-food-with-beef-cream-cheese_90220-1192.jpg?w=2000',[
            new Ingredient('Bun',2),
            new Ingredient('Patty',2),
            new Ingredient('Cheese',1),
            new Ingredient('Tomato',1),
            new Ingredient('Onion',1),
        ]),
        new Recipe('Pizza', 'A Test Recipe Pizza','https://www.allrecipes.com/thmb/iXKYAl17eIEnvhLtb4WxM7wKqTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/240376-homemade-pepperoni-pizza-Beauty-3x4-1-6ae54059c23348b3b9a703b6a3067a44.jpg',[
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
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, recipe:Recipe) {
        this.recipes[index]= recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}