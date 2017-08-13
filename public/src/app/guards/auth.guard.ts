import { DataCollectionService } from './../services/data-collection.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

	redirectUrl;

	constructor(private dcs: DataCollectionService, private router: Router) { }

	canActivate() {
		if (this.dcs.loggedIn()) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}

	}

}