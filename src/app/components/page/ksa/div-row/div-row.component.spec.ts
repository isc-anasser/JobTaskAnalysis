import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivRowComponent } from './div-row.component';

describe('DivRowComponent', () => {
  let component: DivRowComponent;
  let fixture: ComponentFixture<DivRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
