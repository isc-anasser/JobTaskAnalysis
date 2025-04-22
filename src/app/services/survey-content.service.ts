import { Injectable, resource, ResourceRef } from '@angular/core';
import { Page, SurveyContent } from '../types';
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

type NavObj = {
  path: string,
  pageIndex: number
}

function mapContentToPages(config:SurveyContent): Page[] {
  const pages: Page[] = [];
  for (let page of config.pages) {
    if ("type" in page.content[0] && page.content[0].type === "JTA") {
      for (let KSAGroup of page.content[0].ksaGroups) {
        for (let KSA of KSAGroup.ksas) {
          const newPage: Page = {
            title: `${KSAGroup.id} ${KSAGroup.text}`,
            content: [KSA]
          }
          pages.push(newPage)
        }
        const newPage: Page = {
          title: `Comment for KSA Group ${KSAGroup.id}`,
          content: [KSAGroup]
        };
        pages.push(newPage);
      }
    } else {
      pages.push(page)
    }
  }
  return pages
}

function setUpNavLinks(surveyUrl: string, array: Page[]):NavObj[] {
  console.log(array)
  const output = [];
  for (let [index, _] of array.entries()) {
    output.push({
      path: `/${surveyUrl}/page/`,
      pageIndex: index + 1
    })
  }
  return output
}

@Injectable({
  providedIn: 'root'
})
export class SurveyContentService {

  constructor() { }
  private config = window.JTA_CONFIG;


  getConfig() {
    return this.config
  }
  // readonly surveyContent = resource({
  //   request: () => "true",
  //   loader: async () => {
  //     let response = await fetch(`${window.JTA_CONFIG.url}/jtacontent`)
  //     return 'hello'
  //   }
  // })

 

  mappedPagesArray = mapContentToPages(this.config);
  navLinks = setUpNavLinks(this.config.url, this.mappedPagesArray);
}
