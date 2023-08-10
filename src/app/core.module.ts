import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptopService } from './auth/auth-interceptor.service';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        ShoppingListService, 
        RecipeService, 
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptopService, 
            multi: true
        }
    ],
})
export class CoreModule { }
