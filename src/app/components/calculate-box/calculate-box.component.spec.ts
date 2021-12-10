import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateBoxComponent } from './calculate-box.component';

describe('CalculateBoxComponent', () => {
  let component: CalculateBoxComponent;
  let fixture: ComponentFixture<CalculateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
