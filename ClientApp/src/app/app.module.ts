import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { HomeComponent } from './common/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { ArticleComponent } from './content/article/article.component';
import { AboutUsComponent } from './common/about-us/about-us.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from './material/material.module';
import {PageNotFoundComponent} from "./common/page-not-found/page-not-found.component";
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ShopListComponent } from './content/shop/shop-list/shop-list.component';
import { ShopDetailComponent } from './content/shop/shop-detail/shop-detail.component';
import { CheckboxEquipmentComponent } from './search/checkbox-equipment/checkbox-equipment.component';
import { EquipmentListComponent } from './content/equipment/equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './content/equipment/equipment-detail/equipment-detail.component';
import { EventListComponent } from './content/event/event-list/event-list.component';
import { EventDetailedComponent } from './content/event/event-detailed/event-detailed.component';
;


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,
    RegistrationComponent,
    ArticleComponent,
    AboutUsComponent,
    UserProfileComponent,
    AdminProfileComponent,
    SearchComponent,
    PageNotFoundComponent,
    SideNavComponent,
    ShopListComponent,
    ShopDetailComponent,
    CheckboxEquipmentComponent,
    EquipmentListComponent,
    EquipmentDetailComponent,
    EventListComponent,
    EventDetailedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'registration', component: RegistrationComponent},
      {path: 'shop', component: ShopListComponent},
      {path: 'shop/:id', component: ShopDetailComponent},
      {path: 'user', component: UserProfileComponent},
      {path: 'equipment', component: EquipmentListComponent},
      {path: 'admin', component: AdminProfileComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: '**', component: PageNotFoundComponent}

    ]),
    ReactiveFormsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
