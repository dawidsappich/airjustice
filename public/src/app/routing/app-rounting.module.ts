import { CheckClaimComponent } from './../components/check-claim/check-claim.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'claim',
		component:CheckClaimComponent
	},
	{
		path: '**',
		component:HomeComponent
	}
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }