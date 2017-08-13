import { RegisterComponent } from './../components/register/register.component';
import { LoginComponent } from './../components/login/login.component';
import { ReasonComponent } from './../components/reason/reason.component';
import { FormContainerComponent } from './../components/form-container/form-container.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./../guards/auth.guard";
import { NoAuthGuard } from "./../guards/noAuth.guard";

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [NoAuthGuard]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [NoAuthGuard]
	},
	{
		path: 'forms',
		component: FormContainerComponent,
		canActivate: [AuthGuard]
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