import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpanseSummaryComponent } from './expanse-summary.component';

describe('ExpanseSummaryComponent', () => {
  let component: ExpanseSummaryComponent;
  let fixture: ComponentFixture<ExpanseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpanseSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpanseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
