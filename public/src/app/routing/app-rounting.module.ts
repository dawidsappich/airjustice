import { FormsComponent } from './../components/forms/forms.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'forms',
		component: FormsComponent
	},
	{
		path: '**',
		component: HomeComponent
	}
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }