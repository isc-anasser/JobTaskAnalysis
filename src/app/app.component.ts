import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoandtitleComponent } from "./components/logoandtitle/logoandtitle.component";
import { SurveyContentService } from './services/survey-content.service';
import { Page, SurveyContent } from './types';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LogoandtitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor() {
    let service = inject(SurveyContentService);
    console.log(service.getConfig())
  }
  surveyContentService = inject(SurveyContentService);
  title = 'JtaApp';
  examName = signal(this.surveyContentService.getConfig().examName);
  contentService = inject(SurveyContentService);
  navLinks = this.contentService.navLinks;
  
}
