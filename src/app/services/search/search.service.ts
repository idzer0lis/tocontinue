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
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Company } from '../../models/company';

@Injectable()
export class SearchService {
  private backendData = 'api/companies';
  constructor(private http: Http) { }
  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }
  // In a real scenario I will make a request as HTTP.GET(this.backendData + '?search=' + term) and the implementation is server side
  searchEntries(term: string): Observable<any> {
    return this.http.get(this.backendData)
      .map(res => {
        let response: Company = res.json().data;
        let toSearch: Array<string> = [];
        Object.keys(response).filter(key => {
          toSearch.push(response[key].title);
          response[key].tenants.forEach(tenant => toSearch.push(tenant.title));
        });
        return toSearch.filter(result => result.toLowerCase().indexOf(term.toLowerCase()) > -1);
      });
  };
}
