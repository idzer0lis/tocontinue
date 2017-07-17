import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';
import { Role } from '../role/role';
import { CompanyUserRole } from '../role/company-user-role';
import { CompanyUserRoleTable } from '../role/company-user-role-table';
import { CompanyUserTable } from '../role/company-user-table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  private backendData = 'api/users';  // URL mockup web API
  private users = new BehaviorSubject<User[]>([]);
  private companyUsers = new BehaviorSubject<CompanyUserRoleTable[]>([]);
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
  getCompanyRoleIdById(id: number): Observable<number> {
    let roles = new BehaviorSubject<number>(0);
    this.http.get('api/companyRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(row => {
          if (row.id === id) {
            roles.next(row.id);
          }
        });
      });
    return roles;
  }
  getCompanyRoleNameById(id: number): Observable<string> {
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
    this.companyUsers = new BehaviorSubject<CompanyUserRoleTable[]>([]);
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
              console.log('INSERTED AT EXISTING USERS');
              let username = this.getUserById(row.userId).username;
              this.getCompanyRoleNameById(roleId).subscribe(roleName => {
                if (roleName.length) {
                  this.companyUsers.next([...this.companyUsers.value,
                    {id: row.userId, username: username, roleId: roleId, role: roleName}]);
                }
              });
              // check if there is there are new roles for existing users, insert them otherwise
              values.userId.forEach(userId => {
                values.companyRole.forEach(roleId => {
                  if (row.companyRole.indexOf(roleId) === -1 && row.userId === userId) {
                    console.log('INSERTED AT LOOPING VALUES');
                    let username = this.getUserById(row.userId).username;
                    this.getCompanyRoleNameById(roleId).subscribe(roleName => {
                      if (roleName.length) {
                        this.companyUsers.next([...this.companyUsers.value,
                          {id: row.userId, username: username, roleId: roleId, role: roleName}]);
                      }
                    });
                  }
                });
              });
            });
            newUsers = values.userId.filter(id => id === row.userId);
            console.log(newUsers);
          }
        }); // end of company user-role looping; we know which users are new; Insert them
        newUsers.forEach(newUserId => {
          values.companyRole.forEach(roleId => {
            let username = this.getUserById(newUserId).username;
            this.getCompanyRoleNameById(roleId).subscribe(roleName => {
              if (roleName.length) {
                console.log('INSERTED AT NEW USERS');
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
    this.getCompanyRoleNameById(roleId).subscribe(roleName => {
      if (roleName.length) {
        return {username: username, role: roleName};
      }
    });
    return null;
  }
  getUsersByCompany(companyId: number): Observable<CompanyUserRoleTable[]> {
    this.companyUsers = new BehaviorSubject<CompanyUserRoleTable[]>([]);
    this.http.get('api/companyUserRoles?companyId=' + companyId )
      .map( (response: Response) => response.json().data)
      .subscribe((data: CompanyUserRole[]) => {
        data.forEach(row => {
          let username: string = this.getUserById(row.userId).username;
          row.companyRole.forEach(roleId => {
            this.getCompanyRoleNameById(roleId).subscribe((roles: string) => {
              if (roles.length) {
                let newValue: CompanyUserRoleTable = {
                  id: row.userId,
                  username: username,
                  roleId: roleId,
                  role: roles
                };
                this.companyUsers.next([...this.companyUsers.value, newValue]);
              }
            });
          });
        });
      });
    return this.companyUsers;
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
