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
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpHelperService {

  /**
   * Handles HTTP Errors
   * @param HTTP error
   */
  static handleError(err: HttpErrorResponse): void {
   if (!(err instanceof HttpErrorResponse)) { return; }
   if (err.error instanceof Error) {
     // A client-side or network error occurred
     console.log('An error occurred:', err.error.message);
   } else {
     // The backend returned an unsuccessful response code.
     // The response body may contain clues as to what went wrong,
     console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
   }
  }

  /**
   * Set the headers for requests
   */
  static setHeaders(): void {
   // empty for now
  }

  /**
   * Set the auth header for requests
   */
  static setAuthHeaders(): void {
    // empty for now
  }
}
