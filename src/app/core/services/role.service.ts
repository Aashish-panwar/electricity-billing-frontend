import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RoleService {


  getRole(): string | null {


    const token =
      localStorage.getItem('token');


    if (!token) {

      return null;

    }


    try {


      const payload =
        JSON.parse(
          atob(
            token.split('.')[1]
          )
        );


      return payload.role ?? null;


    } catch (error) {


      console.error(
        'Invalid JWT token',
        error
      );


      return null;


    }


  }



  hasRole(role: string): boolean {


    return this.getRole() === role;


  }



  hasAnyRole(roles: string[]): boolean {


    const currentRole =
      this.getRole();


    return currentRole
      ? roles.includes(currentRole)
      : false;


  }


}