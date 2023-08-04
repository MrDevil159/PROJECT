import { Component,OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!:Ingredient[];
  private igChangedSub!: Subscription;
  constructor( private slService:ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredient();
    this.igChangedSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }
  ngOnDestroy() {
      this.igChangedSub.unsubscribe();
  }
}
