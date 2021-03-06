/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {
  private usersURI = 'api/users';  // URL mockup web API
  private users = new BehaviorSubject<User[]>([]);
  constructor(
    private http: Http,
    private router: Router
  ) {
    this.http.get(this.usersURI)
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(user => {
          this.users.next([...this.users.value, user]);
        });
      });
  }
  public getAllUsers(): Observable<User[]> {
    return this.users;
  }
  public getUserById(id: number): User {
    return this.users.value
      .filter( (user: User) => user.id === id)
      .pop();
  }
  // This will not be the final login method. No unit testing on purpose
  public login(username: string, password: string): Observable<User> {
    return this.http.get(this.usersURI)
      .map((response: Response) => {
        let users = response.json().data;
        let found = false;
        if (users.length) {
          // find if any user matches login credentials
          users.forEach(user => {
            if (user.username === username && user.password === password && user.token) {
              // store user details and token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              found = true;
              return user;
            }
          });
          if (!found) { throw new Error('Invalid Username or Password'); }
        }
      }).catch(this.handleError);
  }

  public logout(): Observable<boolean> {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    return of(true);
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
