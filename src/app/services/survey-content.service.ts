import { Injectable } from '@angular/core';
import { Page, Responses, SurveyContent } from '../types';

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

function mapContentToPages(config: SurveyContent, examName: string): Page[] {
  // let mappedPagesString = localStorage.getItem(examName);
  // if (mappedPagesString) {
  //   try {
  //     return JSON.parse(mappedPagesString)
  //   } catch (error) {
  //     //console.error(error)
  //     return setUpPages(config)
  //   }
  // }
  return setUpPages(config)
  function setUpPages(config: SurveyContent) {
    const pages: Page[] = [];
    for (let page of config.pages) {
      if ("type" in page.content[0] && page.content[0].type === "JTA") {
        for (let KSAGroup of page.content[0].ksaGroups) {
          for (let KSA of KSAGroup.ksas) {
            const newPage: Page = {
              title: `${KSAGroup.id}. ${KSAGroup.text}`,
              pageNum: pages.length,
              content: [KSA]
            }
            pages.push(newPage)
          }
          //We empty the KSAs array because its content is no longer needed and we don't want the KSAs to be copied into the responses object which will add overhead when serialized into JSON on submission
          KSAGroup.ksas.length = 0
          const newPage: Page = {
            title: `Comments for: ${KSAGroup.text}`,
            pageNum: pages.length,
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

}

function setUpNavLinks(surveyUrl: string, array: Page[]): NavObj[] {
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

  examName = this.config.examName

  getConfig() {
    return this.config
  }

  getResponses() {
    let localResponses = localStorage.getItem(this.examName);
    if (localResponses) {
      try {
        return JSON.parse(localResponses)
      } catch (error) {
        //console.error(error)
        return {jta:{}, mc: {}, comment: {}, ksaComment: {}}
      }
    }
    return {jta:{}, mc: {}, comment: {}, ksaComment: {}}
  }

  responses: Responses = this.getResponses()

  mappedPagesArray = mapContentToPages(this.config, this.examName);
  navLinks = setUpNavLinks(this.config.url, this.mappedPagesArray);
}
