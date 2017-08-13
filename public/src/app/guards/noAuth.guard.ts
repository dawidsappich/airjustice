import { DataCollectionService } from './../services/data-collection.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class NoAuthGuard implements CanActivate {
	constructor(private dcs: DataCollectionService, private router: Router) { }

	canActivate() {

		if (this.dcs.loggedIn()) {
			this.router.navigate(['/']);
			return false;
		} else {
			return true;
		}

	}

}