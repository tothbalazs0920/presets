import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './../user';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  //lock = new Auth0Lock('YOUR-AUTH0-CLIENT-ID', 'YOUR-AUTH0-DOMAIN.auth0.com');
  lock = new Auth0Lock('IZ3GZtcNIwZZHEXtzroj5rprgJWm053V', 'anantar.eu.auth0.com');

  constructor(private router: Router, private userService: UserService) {
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }
        var user = new User(
          profile.email,
          profile.user_id,
          profile.name,
          profile.picture,
          profile.given_name,
          profile.family_name,
          profile.nickname
        );

        userService.addUserIfDoesNotExist(user);

        localStorage.setItem('profile', JSON.stringify(profile));
      });

      this.lock.hide();
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/profile');
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
