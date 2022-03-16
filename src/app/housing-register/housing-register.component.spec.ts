import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingRegisterComponent } from './housing-register.component';

describe('HousingRegisterComponent', () => {
  let component: HousingRegisterComponent;
  let fixture: ComponentFixture<HousingRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
