import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDelivery } from './list-delivery';

describe('ListDelivery', () => {
  let component: ListDelivery;
  let fixture: ComponentFixture<ListDelivery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDelivery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDelivery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
