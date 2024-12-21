import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { RegisterComponent } from './pages/admin/register/register.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    }, 
    {
        path:'register',
        component:RegisterComponent

    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'products',
                component: ProductsComponent
            },
            {
                path:'category',
                component: CategoriesComponent
            }
        ]
    }
];
