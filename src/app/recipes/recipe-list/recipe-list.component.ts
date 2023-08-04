import { Component, EventEmitter, Output,Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
recipes: Recipe[] = [];
constructor(private recipeServices:RecipeService,
  private router:Router,
  private route: ActivatedRoute) {}
ngOnInit() {
  this.recipes = this.recipeServices.getRecipe();
}

onNewRecipe() {
  this.router.navigate(['new'], {relativeTo: this.route})
}

}
