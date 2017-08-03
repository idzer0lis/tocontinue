/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'my-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  results: Array<string>;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results;
      });
  }
}
