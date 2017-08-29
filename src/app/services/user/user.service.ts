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
import { Http , Response, Headers, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { ErrorService } from '../error/error.service';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class UserService {

  private backendURL = 'https://centos7.rodo.avaya.arg.lab:8083/api/v1/';
  private users = new BehaviorSubject<User[]>([]);

  private setHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
    });
  }
  private setRequestOptions(method: string): RequestOptionsArgs {
    let options = new BaseRequestOptions();
    options.headers = this.setHeaders();
    options.method = method;
    options.withCredentials = true;
    return options;
  }

  constructor(
    private http: Http
  ) {}

  public getAllUsers(): Observable<User[]> {
    return this.users;
  }
  public getUserById(id: number): User {
    return this.users.value
      .filter( (user: User) => user.id === id)
      .pop();
  }
  public loginWrapper(username: string, password: string): any {
   return this.checkSession().subscribe(a => console.log(a));
     // return of(username);
    /*return this.checkSession()
      .subscribe(response => {
        if (response.ok) {
          console.log(response)
          return this.login(username, password);
        }
      });*/
  }
  /**
   * Login using usr/pass combo
   * @param username
   * @param password
   * @returns Observable of user
   */
  public login(username: string, password: string): any {
    let body = JSON.stringify({
      'user': username,
      'pass': password
    });
    // first checksession, check return status, if not do the login

    return this.http
      .post(`${this.backendURL}login`, body, this.setRequestOptions('POST'))
      .map(res => res)
      .do( (response: Response) => {
        console.log(response);
          if (response.ok) {
            switch (response.status) {
              case 200:
                return of(username);
              case 403:
                console.log('forbidden');
                return _throw('Forbidden');
              case 500:
                console.log('Server Error');
                return _throw('Server Error');
              default:
                console.log(response);
            }
          }
        },
        err => {
          return ErrorService.handleError(err);
        });
  }
  /**
   * Logout user method
   * @returns Observable with any info
   */
  public logout(): any {
    return this.http
      .get(`${this.backendURL}logout`)
      .map((res: Response) => res)
/*      .do(() => of (true))
      .catch((err: any) => Observable.throw(ErrorService.handleError(err)));*/
  }
  /**
   * Checks a user session
   * @returns Boolean observable
   */
  public checkSession(): any {
    console.log('CHECKING SESSION');
    return this.http
      .get(`${this.backendURL}checkSession`)
      .map((res: Response) => res)
      .do( res => {
        console.log(res);
        return res;
      });
      /*.do((res) => {
        if (res.ok && res.status === 200) {
          return true;
        }
        return false;
      });*/
      // .catch((err: any) => _throw(err));
  }
}
