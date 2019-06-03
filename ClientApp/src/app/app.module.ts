import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContentListComponent } from './content-list/content-list.component';
import { ArticleComponent } from './article/article.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from './material/material.module';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FooterComponent,
    RegistrationComponent,
    ContentListComponent,
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
      {path: 'shop:id', component: ShopDetailComponent},
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
