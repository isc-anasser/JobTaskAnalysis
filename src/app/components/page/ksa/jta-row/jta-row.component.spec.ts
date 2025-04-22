import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JtaRowComponent } from './jta-row.component';

describe('JtaRowComponent', () => {
  let component: JtaRowComponent;
  let fixture: ComponentFixture<JtaRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtaRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JtaRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
