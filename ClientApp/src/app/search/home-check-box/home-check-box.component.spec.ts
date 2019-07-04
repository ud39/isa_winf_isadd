import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCheckBoxComponent } from './home-check-box.component';

describe('HomeCheckBoxComponent', () => {
  let component: HomeCheckBoxComponent;
  let fixture: ComponentFixture<HomeCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
