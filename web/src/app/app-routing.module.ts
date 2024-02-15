import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsComponent } from './pages/forms/forms.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/br' },
  { path: ':lang', component: HomeComponent, data: { lang: 'lang' } },
  { path: 'forms', component: FormsComponent } // br#forms ou en#forms
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
