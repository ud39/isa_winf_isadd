import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { HomeComponent } from './common/home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
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
;


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
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
    ShopDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'counter', component: CounterComponent},
      {path: 'fetch-data', component: FetchDataComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'shop', component: ShopListComponent},
      {path: 'shop/:id', component: ShopDetailComponent},
      {path: 'user', component: UserProfileComponent},
      {path: 'article', component: ArticleComponent},
      {path: 'admin', component: AdminProfileComponent},
      {path: '**', component: PageNotFoundComponent}
    ]),
    ReactiveFormsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
