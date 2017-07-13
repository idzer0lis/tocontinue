import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../user/user';
import { Role } from '../role/role';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  private backendData = 'api/users';  // URL mockup web API
  private users = new BehaviorSubject<User[]>([]);
  constructor(
    private http: Http,
    private router: Router
  ) {
    this.http.get(this.backendData)
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(user => {
          this.users.next([...this.users.value, user]);
        });
      });
  }
  getAllUsers(): Observable<User[]> {
    return this.users;
  }
  getUserById(id: number): User {
    return this.users.value
      .filter( (user: User) => user.id === id)
      .pop();
  }
  getRoleById(id: number): Observable<Array<string>> {
    let roles = new BehaviorSubject<Array<string>>([]);
    this.http.get('api/companyRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(row => {
          if (row.id === id) {
           roles.next([...roles.value, row.name]);
          }
        });
      });
    return roles;
  }
  setUsersInCompany(companyId: number, values: Object = {}): object {
    let companyUsers = new BehaviorSubject<Object[]>([]);
    this.http.get('api/companyUserRoles')
      .map( (response: Response) => response.json().data )
      .subscribe(data => {
         console.log(data);
        /*data.forEach(company => {
          if (company.companyId === companyId) {
            Object.assign(company, values);
            console.log(company);
            // Filter for unique ID's
           /!* if (company.userId.length > 1) {
              company.userId.filter((item, i, ar) => ar.indexOf(item) === i);
            }*!/
            // After assigning the new values, get the usernames and role names
           /!* company.userId.forEach(id => {
              let username = this.getUserById(id).username;
              let roles: any = {};
              this.getRoleById(id).subscribe(role => {
                roles = role.join(',');
              });
              companyUsers.next([...companyUsers.value, {username: username, role: roles}]);
            });*!/
          }
        });*/
      });
    return companyUsers;
  }
  getUsersByCompany(companyId: number): Observable<Object[]> {
    let companyUsers = new BehaviorSubject<Object[]>([]);
    this.http.get('api/companyUserRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(row => {
          if (row.companyId === companyId) {
            let username: string = this.getUserById(row.userId).username;
            this.getRoleById(row.userId).subscribe(role => {
              companyUsers.next([{username: username, role: role.join(',')}]);
            });
          }
        });
      });
    return companyUsers;
  }
  // Most likely I will move 'role related' methods into a role service
  getAllRoles(): Observable<Role[]> {
    let companyRoles = new BehaviorSubject<Role[]>([]);
    this.http.get('api/roles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(role => {
          companyRoles.next([...companyRoles.value, role]);
        });
      });
    return companyRoles;
  }
  // This will not be the final login method. No unit testing on purpose
  login(username: string, password: string): Observable<User> {
    return this.http.get(this.backendData)
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

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
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
