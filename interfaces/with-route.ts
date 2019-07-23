import { Route } from 'vue-router';

/* can also extend Vue to make sure nothing is colliding */
export interface IWithRoute {
    $route: Route;
}
