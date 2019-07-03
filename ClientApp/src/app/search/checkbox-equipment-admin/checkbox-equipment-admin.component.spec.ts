import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxEquipmentAdminComponent } from './checkbox-equipment-admin.component';

describe('CheckboxEquipmentAdminComponent', () => {
  let component: CheckboxEquipmentAdminComponent;
  let fixture: ComponentFixture<CheckboxEquipmentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxEquipmentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxEquipmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
