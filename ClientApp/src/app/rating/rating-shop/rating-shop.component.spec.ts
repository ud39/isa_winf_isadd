import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingShopComponent } from './rating-shop.component';

describe('RatingShopComponent', () => {
  let component: RatingShopComponent;
  let fixture: ComponentFixture<RatingShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
