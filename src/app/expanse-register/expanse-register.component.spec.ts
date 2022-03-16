import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpanseRegisterComponent } from './expanse-register.component';

describe('ExpanseRegisterComponent', () => {
  let component: ExpanseRegisterComponent;
  let fixture: ComponentFixture<ExpanseRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpanseRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpanseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
