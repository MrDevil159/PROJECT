import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

// export const recipeResolver: ResolveFn<Recipe[]> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// recipeService: RecipeService
// ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
//      const recipes: Recipe[] = recipeService.getRecipe();
//      if(recipes.length ===0) {
//         return inject(DataStorageService).fetchRecipe();
//      }
//      else {
//         return recipes;
//      }
// };

export const recipeResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
  const recipeService: RecipeService = inject(RecipeService);
  const dataStorageService: DataStorageService = inject(DataStorageService);
  const recipes: Recipe[] = recipeService.getRecipe();
  if (recipes.length === 0) {
    return dataStorageService.fetchRecipe();
  } else {
    return recipes;
  }
};
