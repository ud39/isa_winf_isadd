import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCoffeeComponent } from './checkbox-coffee.component';

describe('CheckboxCoffeeComponent', () => {
  let component: CheckboxCoffeeComponent;
  let fixture: ComponentFixture<CheckboxCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxCoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
