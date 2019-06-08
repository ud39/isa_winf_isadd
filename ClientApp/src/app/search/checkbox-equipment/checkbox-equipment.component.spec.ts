import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxEquipmentComponent } from './checkbox-equipment.component';

describe('CheckboxEquipmentComponent', () => {
  let component: CheckboxEquipmentComponent;
  let fixture: ComponentFixture<CheckboxEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
