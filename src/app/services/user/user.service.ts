import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../user/user';
import { Role } from '../role/role';
import { CompanyUserRole } from '../role/company-user-role';
import { CompanyUserTable } from '../role/company-user-table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  private backendData = 'api/users';  // URL mockup web API
  private users = new BehaviorSubject<User[]>([]);
  private companyUsers = new BehaviorSubject<object[]>([]);
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
  getCompanyRoleById(id: number): Observable<string> {
    let roles = new BehaviorSubject<string>('');
    this.http.get('api/companyRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(row => {
          if (row.id === id) {
           roles.next(row.name);
          }
        });
      });
    return roles;
  }
  removeUserRoleInCompany(companyId?: number, userId: number, roleId: number): object[] {
  }
  // NEEDS REFACTORING
  setUsersInCompany(companyId: number, values: CompanyUserTable): object {
    if (!values.companyRole || !values.userId) { return; }
    let newUsers = [];
    // get all rows(user-role combination within a company), filtering only the current company user-roles;
    this.http.get('api/companyUserRoles')
      .map( (response: Response) => response.json().data )
      .subscribe(data => {
        data.forEach((row: CompanyUserRole) => {
          if (row.companyId === companyId) {
            // Add the users-role that already exist
            row.companyRole.forEach(roleId => {
              // let test = this.getUsernameAndRoles(newUserId, roleId);
              let username = this.getUserById(row.userId).username;
              this.getCompanyRoleById(roleId).subscribe(roleName => {
                if (roleName.length) {
                  this.companyUsers.next([...this.companyUsers.value,
                    {id: row.userId, username: username, roleId: roleId, role: roleName}]);
                }
              });
              // check if there is the user has the role, insert it otherwise
              if (values.userId.indexOf(row.userId) !== -1) {
                values.companyRole.forEach(roleId => {
                  if (row.companyRole.indexOf(roleId) === -1) {
                    let username = this.getUserById(row.userId).username;
                    this.getCompanyRoleById(roleId).subscribe(roleName => {
                      if (roleName.length) {
                        this.companyUsers.next([...this.companyUsers.value,
                          {id: row.userId, username: username, roleId: roleId, role: roleName}]);
                      }
                    });
                  }
                });
              }
            });
            newUsers = values.userId.filter(id => id !== row.userId);
          }
        }); // end of company user-role looping; we know which users are new; Insert them
        newUsers.forEach(newUserId => {
          values.companyRole.forEach(roleId => {
            let username = this.getUserById(newUserId).username;
            this.getCompanyRoleById(roleId).subscribe(roleName => {
              if (roleName.length) {
                this.companyUsers.next([...this.companyUsers.value,
                  {id: newUserId, username: username, roleId: roleId, role: roleName}]);
              }
            });
          });
        });
      });
    return this.companyUsers;
  }
  private getUsernameAndRoles(userId: number, roleId: number): Object {
    let username = this.getUserById(userId).username;
    this.getCompanyRoleById(roleId).subscribe(roleName => {
      if (roleName.length) {
        return {username: username, role: roleName};
      }
    });
    return null;
  }
  getUsersByCompany(companyId: number): Observable<Object[]> {
    let companyUsers = new BehaviorSubject<Object[]>([]);
    this.http.get('api/companyUserRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(row => {
          if (row.companyId === companyId) {
            let username: string = this.getUserById(row.userId).username;
            this.getCompanyRoleById(row.userId).subscribe(roles => {
              if (roles.length) {
                companyUsers.next([...companyUsers.value, {username: username, role: roles, id: row.userId}]);
              }
            });
          }
        });
      });
    return companyUsers;
  }
  // Most likely I will move 'role related' methods into a role service
  getAllRoles(): Observable<Role[]> { // tslint: disable-line
    let roles = new BehaviorSubject<Role[]>([]);
    this.http.get('api/roles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(role => {
          roles.next([...roles.value, role]);
        });
      });
    return roles;
  }
  // Most likely I will move 'role related' methods into a role service
  getAllCompanyRoles(): Observable<CompanyUserRole[]> {
    let companyRoles = new BehaviorSubject<CompanyUserRole[]>([]);
    this.http.get('api/companyRoles')
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
