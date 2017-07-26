import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { Company } from '../../models/company';
import { CompanyRoleTable } from '../../models/company-role-table';
import { CompanyUserRoleTable } from '../../models/company-user-role-table';
import { CompanyUserTable } from '../../models/company-user-table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CompanyUserRole } from '../../models/company-user-role';

@Injectable()
export class UserService {
  private backendData = 'api/users';  // URL mockup web API
  private users = new BehaviorSubject<User[]>([]);
  private companyUsers = new BehaviorSubject<CompanyUserRoleTable[]>([]);
  private companyRoles =  new BehaviorSubject<CompanyRoleTable[]>([]);
  private username = '';
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
    this.http.get('api/companyRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(role => {
          this.companyRoles.next([...this.companyRoles.value, role]);
        });
      });
    this.http.get('api/companyUserRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data: CompanyUserRole[]) => {
        data.forEach(row => {
          this.username = this.getUserById(row.userId).username;
          row.companyRole.forEach(roleId => {
            this.getCompanyRoleNameById(roleId).subscribe((roles: string) => {
              if (roles.length) {
                let newValue: CompanyUserRoleTable = {
                  id: row.userId,
                  username: this.username,
                  roleId: roleId,
                  role: roles
                };
                this.companyUsers.next([...this.companyUsers.value, newValue]);
              }
            });
          });
        });
      });
    console.log(this.companyUsers);
  }
  getAllUsers(): Observable<User[]> {
    return this.users;
  }
  getUserById(id: number): User {
    return this.users.value
      .filter( (user: User) => user.id === id)
      .pop();
  }
  getCompanyRoleIdById(id: number): CompanyUserRoleTable {
    return this.companyUsers.value
      .filter((companyRole: CompanyUserRoleTable) => companyRole.id === id)
      .pop();
    /*let roles = new BehaviorSubject<number>(0);
    this.http.get('api/companyRoles')
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(row => {
          if (row.id === id) {
            roles.next(row.id);
          }
        });
      });
    return roles;*/
  }
  getCompanyRoleName(id: number): any {
    return this.companyRoles.value
      .filter( (role: CompanyRoleTable) => role.id === id)
      .pop();
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
  removeUserRoleInCompany(userId: number, roleId: number): Observable<CompanyUserRoleTable[]> {
    // broken, this.companyUsers should be the same as the one set in setUsersInCompany but its not
    this.companyUsers.subscribe(x => console.log(x));
    let newUsers: any = this.companyUsers
      .getValue()
      .filter((user: CompanyUserRoleTable) => !(user.id === userId && user.roleId === roleId));
    this.companyUsers.next(newUsers);
   return this.companyUsers;
  }
  // in a normal scenario, I'll just PUT/POST data to an url, now I'm semi-simulating a backend method
  setUsersInCompany(companyId: number, values: CompanyUserTable): Observable<CompanyUserRoleTable[]> {
    if (!values.companyRole || !values.userId) { return; }
    this.companyUsers.next([]); // empty object
    let currentUsersIds = [];
    let newUsersIds = [];
    let newRolesIds = [];
    this.http.get('api/companyUserRoles?companyId=' + companyId )
      .map( (response: Response) => response.json().data )
      .subscribe(data => {
        data.forEach((row: CompanyUserRole) => {
          currentUsersIds.push(row.userId);
          // Stage1: Add the users-role that already exist
          let username = this.getUserById(row.userId).username;
          row.companyRole.forEach(roleId => {
            console.log('INSERTED AT EXISTING USERS');
            this.getCompanyRoleNameById(roleId).subscribe(roleName => {
              if (roleName.length) {
                this.companyUsers.next([...this.companyUsers.value,
                  {id: row.userId, username: username, roleId: roleId, role: roleName}]);
              }
            });
          });
          // Stage 2: check if there is there are new roles for existing users, insert them otherwise
          if (values.userId.indexOf(row.userId) !== -1) {
            // compare two integer arrays( user role ids and values role ids to see if there are new roles ids)
            // the arrays are very short, we don't have to worry about O(n)
            row.companyRole.sort();
            values.companyRole.sort();
            newRolesIds = values.companyRole.filter(id => row.companyRole.indexOf(id) === -1);
            newRolesIds.forEach((newRoleId: number) => {
              console.log('INSERTED AT LOOPING VALUES');
              username = this.getUserById(row.userId).username;
              this.getCompanyRoleNameById(newRoleId).subscribe(roleName => {
                if (roleName.length) {
                  this.companyUsers.next([...this.companyUsers.value,
                    {id: row.userId, username: username, roleId: newRoleId, role: roleName}]);
                }
              });
            });
          }
          newRolesIds = []; // reset new roles for each user
        });
        // Stage3: Insert new user-roles
        newUsersIds = values.userId.filter(id => currentUsersIds.indexOf(id) === -1);
         newUsersIds.forEach(newUserId => {
           values.companyRole.forEach(newRoleId => {
             console.log('INSERTED AT NEW USERS');
             let username = this.getUserById(newUserId).username;
             this.getCompanyRoleNameById(newRoleId).subscribe(roleName => {
               if (roleName.length) {
                 this.companyUsers.next([...this.companyUsers.value,
                   {id: newUserId, username: username, roleId: newRoleId, role: roleName}]);
               }
             });
           });
         });
      });
    return this.companyUsers;
  }

  getUsersByCompany(companyId: number): Observable<CompanyUserRoleTable[]>{

    return this.companyUsers.value
      .filter((companyRole: CompanyUserRoleTable) => companyRole.id === companyId);
    /*this.companyUsers.next([]); // = new BehaviorSubject<CompanyUserRoleTable[]>([]);
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
    console.log(this.companyUsers);
    return this.companyUsers;*/
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
  getAllCompanyRoles(): Observable<CompanyRoleTable[]> {
   return this.companyRoles;
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
