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
import { EquipmentListComponent } from './content/equipment/equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './content/equipment/equipment-detail/equipment-detail.component';
import { EventListComponent } from './content/event/event-list/event-list.component';
import { EventDetailedComponent } from './content/event/event-detailed/event-detailed.component';
import {ShopTabComponent} from "./profile/admin-profile/tabs/shop-tab/shop-tab.component";
import { EventTabComponent } from './profile/admin-profile/tabs/event-tab/event-tab.component';
import { ContentTabComponent } from './profile/admin-profile/tabs/content-tab/content-tab.component';
import {MAT_DATE_LOCALE, MAT_DIALOG_DEFAULT_OPTIONS, MatRadioModule} from "@angular/material";
import {TruncateModule} from "@yellowspot/ng-truncate";
import { ArticleListComponent } from './content/wiki/article-list/article-list.component';
import { ArticleDetailComponent } from './content/wiki/article-detail/article-detail.component';
import {CheckboxCoffeeComponent} from "./search/checkbox-coffee/checkbox-coffee.component";
import {SlideshowModule} from "ng-simple-slideshow";
import { UserTabComponent } from './profile/admin-profile/tabs/user-tab/user-tab/user-tab.component';
import {EditListComponent} from "./profile/admin-profile/dialog/edit-list/edit-list.component";
import {Global} from "./global";
import { FilterComponent } from './filtering/filter/filter.component';
import { ConfirmationComponent } from './profile/admin-profile/dialog/confirmation/confirmation.component';
import { ArticleTabComponent } from './profile/admin-profile/tabs/article-tab/article-tab.component';
import { CheckboxShopAdminComponent } from './search/checkbox-shop-admin/checkbox-shop-admin.component';
import { CheckboxEquipmentAdminComponent } from './search/checkbox-equipment-admin/checkbox-equipment-admin.component';
import { CheckboxCoffeeAdminComponent } from './search/checkbox-coffee-admin/checkbox-coffee-admin.component';
import { RatingShopComponent } from './rating/rating-shop/rating-shop.component';
import { HomeCheckBoxComponent } from './search/home-check-box/home-check-box.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,
    RegistrationComponent,
    AboutUsComponent,
    UserProfileComponent,
    AdminProfileComponent,
    SearchComponent,
    PageNotFoundComponent,
    SideNavComponent,
    ShopListComponent,
    ShopDetailComponent,
    EquipmentListComponent,
    EquipmentDetailComponent,
    EventListComponent,
    EventDetailedComponent,
    ShopTabComponent,
    EventTabComponent,
    ContentTabComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    CheckboxCoffeeComponent,
    UserTabComponent,
    EditListComponent,
    FilterComponent,
    ConfirmationComponent,
    ArticleTabComponent,
    CheckboxShopAdminComponent,
    CheckboxEquipmentAdminComponent,
    CheckboxCoffeeAdminComponent,
    RatingShopComponent,
    HomeCheckBoxComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    SlideshowModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'registration', component: RegistrationComponent},
      {path: 'events', component: EventListComponent },
      {path: 'events/:id', component: EventDetailedComponent},
      {path: 'shops', component: ShopListComponent},
      {path: 'shops/:id', component: ShopDetailComponent},
      {path: 'user', component: UserProfileComponent},

      {path: 'supplies', component: EquipmentListComponent,
        children:[
          {path: '', redirectTo: 'supplies', pathMatch: 'full'},
          {path: 'equipment', component: EquipmentDetailComponent},
          {path: 'ingredients', component: EquipmentDetailComponent}
        ]
      },

      {path: 'wiki', component: ArticleListComponent},
      {path: 'admin', component: AdminProfileComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: '**', component: PageNotFoundComponent}

    ]),
    ReactiveFormsModule,
    LayoutModule,
    MatRadioModule,
    TruncateModule,
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: Global}],
  entryComponents: [EditListComponent, ConfirmationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
