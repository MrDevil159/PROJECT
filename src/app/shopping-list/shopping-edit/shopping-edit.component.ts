import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  constructor(private slService: ShoppingListService) {}
  ngOnInit() {
      this.subscription = this.slService.startedEditing
      .subscribe((index: number)=> {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredients(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.slForm.reset();
      this.editMode = false;
    } else {
      this.slService.addIngredient(newIngredient);       
    }
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
  onDelete() {
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }
}
