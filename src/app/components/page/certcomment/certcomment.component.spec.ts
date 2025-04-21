import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertcommentComponent } from './certcomment.component';

describe('CertcommentComponent', () => {
  let component: CertcommentComponent;
  let fixture: ComponentFixture<CertcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertcommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
