import { RegisterComponent } from './../components/register/register.component';
import { LoginComponent } from './../components/login/login.component';
import { ReasonComponent } from './../components/reason/reason.component';
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
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'forms',
		component: FormContainerComponent
	},
	{
		path: 'reason',
		component: ReasonComponent
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