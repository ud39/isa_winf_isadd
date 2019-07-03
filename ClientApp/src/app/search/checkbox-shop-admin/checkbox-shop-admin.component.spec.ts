import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxShopAdminComponent } from './checkbox-shop-admin.component';

describe('CheckboxShopAdminComponent', () => {
  let component: CheckboxShopAdminComponent;
  let fixture: ComponentFixture<CheckboxShopAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxShopAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxShopAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
