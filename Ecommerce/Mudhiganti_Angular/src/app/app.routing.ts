import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from "./products/products.component";

import { LoginComponent } from "./login/login.component";
import { NewuserComponent } from "./newuser/newuser.component";

import { MyProfileComponenet } from './myprofile/myprofile.component';
import { UploadComponenet } from './upload/upload.component';
import { ProfileComponenet } from './profile/profile.component';
import { MyitemsComponenet } from './myitems/myitems.component';
import { LoginPopupComponent } from "./loginpopup/loginpopup.component";
import { InfoMsgComponenet } from './info/info.component';
import { SoldComponenet } from './solditems/solditems.component';

import { Messages } from './messages/messages.component';
import { AdminComponenet } from './admin/admin.component';

const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/loginpopup', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'loginpopup', component: LoginPopupComponent },
    { path: 'newuser', component: NewuserComponent },
    { path: 'myprofile', component: MyProfileComponenet },
    { path: 'upload', component: UploadComponenet },
    { path: 'profile', component: ProfileComponenet },
    { path: 'myitems', component: MyitemsComponenet },
    { path: 'info', component: InfoMsgComponenet },
    { path: 'solditems', component: SoldComponenet },
    { path: 'messages', component: Messages },
    { path: 'admin', component: AdminComponenet }
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);