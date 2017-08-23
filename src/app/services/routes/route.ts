import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params } from '@angular/router';

/**
 * todo route parameters and static route data.
 * */

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams };
  }
}
