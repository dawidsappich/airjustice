import { FormContainerComponent } from './../components/form-container/form-container.component';
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
		component: FormContainerComponent
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