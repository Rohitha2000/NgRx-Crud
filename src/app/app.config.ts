import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AssociateReducer } from './store/Associate/associate.reducer';
import { associateState } from './store/Associate/associate.state';
import { AssociateEffects } from './store/Associate/associate.effects';
import { provideHttpClient } from '@angular/common/http';
import { AppEffects } from './store/Common/App.effects';
import { CustomerReducer } from './store/Customer/customer.reducer';
import { CustomerEffects } from './store/Customer/customer.effect';
import { UserEffects } from './store/User/user.effects';
import { UserReducer } from './store/User/user.reducer';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({associate: AssociateReducer, customer:CustomerReducer, user:UserReducer}), 
    provideHttpClient(),
    provideEffects([AssociateEffects, AppEffects, CustomerEffects, UserEffects]), 
    provideRouterStore(), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
