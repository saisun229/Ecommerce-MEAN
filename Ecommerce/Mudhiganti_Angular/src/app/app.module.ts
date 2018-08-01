import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

//import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { AppComponent }         from './app.component';
import { MenuComponent } from './menu.component';
import { ProductsComponent } from './products/products.component';
import { CurrencyComponent } from './currency/currency.component';
import { MovieComponent } from './movie/movie.component';
import { CONST_ROUTING } from './app.routing';
import { SharedService } from "./shared.service";
import { APIService } from "./services/api.service";
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';
import { MyProfileComponenet } from './myprofile/myprofile.component';
import { UploadComponenet } from './upload/upload.component';
import { ProfileComponenet } from './profile/profile.component';
import { MyitemsComponenet } from './myitems/myitems.component';
import { LoginPopupComponent } from './loginpopup/loginpopup.component';
import { InfoMsgComponenet } from './info/info.component';

import { SoldComponenet } from './solditems/solditems.component';
import { Messages } from './messages/messages.component';
import { AdminComponenet } from './admin/admin.component';



import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';

//import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    CONST_ROUTING
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    ProductsComponent,
    CurrencyComponent,
    MovieComponent,
    HeaderComponent,
    CategoryComponent,
    LoginComponent,
    NewuserComponent,
    MyProfileComponenet,
    UploadComponenet,
    ProfileComponenet,
    MyitemsComponenet,
    LoginPopupComponent,
    InfoMsgComponenet,
    SoldComponenet,
    Messages,
    AdminComponenet
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    APIService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
