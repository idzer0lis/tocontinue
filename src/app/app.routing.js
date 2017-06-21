import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
var routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];
export var routing = RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map