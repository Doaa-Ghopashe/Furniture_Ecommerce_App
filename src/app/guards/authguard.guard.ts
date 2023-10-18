import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn : 'root'
})

export class AuthGaurdService implements CanActivate {
  constructor(private router :Router){

  }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // if(ProductData.find(product=> product.id == route.params['id'] && product.category == route.params['category'])){
    //         return true
    //      }else{
    //         this.router.navigate(['products'])
    //         return false;
    //      }
    return true
  }
}

// export const authguardGuard: CanActivateFn = (route,state) => {
//    if(ProductData.find(product=> product.id == route.params['id'] && product.category == route.params['category'])){
//     console.log(route);
//     console.log(state);
    
    
//       return true
//    }else{
//       state.url = "/products";
//       return false;
//    }
// };
