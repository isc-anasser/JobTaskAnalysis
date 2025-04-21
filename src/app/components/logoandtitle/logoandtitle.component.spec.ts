import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoandtitleComponent } from './logoandtitle.component';

describe('LogoandtitleComponent', () => {
  let component: LogoandtitleComponent;
  let fixture: ComponentFixture<LogoandtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoandtitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoandtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
