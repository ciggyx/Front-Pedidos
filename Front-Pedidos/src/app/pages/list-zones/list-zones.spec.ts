import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListZones } from './list-zones';

describe('ListZones', () => {
  let component: ListZones;
  let fixture: ComponentFixture<ListZones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListZones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListZones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
