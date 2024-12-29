import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { RegisterComponent } from './pages/admin/register/register.component';
import { AuthGuard } from './auth.guard';
import { ResetPasswordComponent } from './pages/admin/reset-password/reset-password.component';

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
        path:'reset-password',
        component:ResetPasswordComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'products',
                component: ProductsComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'category',
                component: CategoriesComponent
            }
        ]
    }
];
