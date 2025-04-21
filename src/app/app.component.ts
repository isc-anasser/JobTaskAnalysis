import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoandtitleComponent } from "./components/logoandtitle/logoandtitle.component";
import { SurveyContentService } from './services/survey-content.service';
import { Page, SurveyContent } from './types';

type NavObj = {
  path: string,
  pageIndex: number
}

function mapContentToPages(config:SurveyContent): Page[] {
  const pages: Page[] = [];
  for (let page of config.pages) {
    if ("type" in page.content[0] && page.content[0].type === "JTA") {
      for (let KSAGroup of page.content[0].ksaGroups) {
        const newPage: Page = {
          title: `Comment for KSA Group ${KSAGroup.id}`,
          content: [KSAGroup]
        };
        pages.push(newPage);
        for (let KSA of KSAGroup.ksas) {
          const newPage: Page = {
            title: KSA.text,
            content: [KSA]
          }
          pages.push(newPage)
        }
      }
    } else {
      pages.push(page)
    }
  }
  return pages
}

function setUpPages(surveyUrl: string, array: Page[]):NavObj[] {
  const output = [];
  for (let [index, _] of array.entries()) {
    output.push({
      path: `/${surveyUrl}/page/`,
      pageIndex: index + 1
    })
  }
  return output
}


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
  mappedPagesArray = mapContentToPages(this.surveyContentService.getConfig());
  pages = setUpPages(this.surveyContentService.getConfig().url, this.mappedPagesArray);

}
