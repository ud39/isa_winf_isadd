import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCoffeeAdminComponent } from './checkbox-coffee-admin.component';

describe('CheckboxCoffeeAdminComponent', () => {
  let component: CheckboxCoffeeAdminComponent;
  let fixture: ComponentFixture<CheckboxCoffeeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxCoffeeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxCoffeeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
