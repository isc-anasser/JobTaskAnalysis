import { Injectable, resource, ResourceRef } from '@angular/core';
import { SurveyContent } from '../types';
import { Route } from '@angular/router';
import { PageComponent } from '../components/page/page.component';

declare global {
  interface Window {
    JTA_CONFIG: SurveyContent;
  }
}

// function setUpRoutes(config: SurveyContent):Route[] {
//   let output: Route[] = [];
//   const appPath = config.url;
//   for (let [index, page] of config.pages.entries()) {
//     let route: Route = {
//       path: `${appPath}/:pageNum`,
//       title: page.title,
//       component: PageComponent
//     };
//   }

//   return output
// }

@Injectable({
  providedIn: 'root'
})
export class SurveyContentService {

  constructor() { }
  private config = window.JTA_CONFIG;


  getConfig() {
    return this.config
  }
  readonly surveyContent = resource({
    request: () => "true",
    loader: async () => {
      let response = await fetch(`${window.JTA_CONFIG.url}/jtacontent`)
      return 'hello'
    }
  })
}
