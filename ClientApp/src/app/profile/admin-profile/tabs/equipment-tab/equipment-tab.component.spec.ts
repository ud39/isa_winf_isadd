import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTabComponent } from './equipment-tab.component';

describe('EquipmentTabComponent', () => {
  let component: EquipmentTabComponent;
  let fixture: ComponentFixture<EquipmentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
