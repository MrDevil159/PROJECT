import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipe();
    this.http
      .put(
        'https://recipe-capstone-linkzy-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
  }
  fetchRecipe() {
    this.http
      .get<Recipe[]>(
        'https://recipe-capstone-linkzy-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((res) => {
          return res.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.recipeService.setRecipes(res);
        },
        error: (err) => console.log(err),
      });
  }
}
