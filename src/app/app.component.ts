import { ChangeDetectionStrategy, Component, inject, input, resource, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LogoandtitleComponent } from "./components/logoandtitle/logoandtitle.component";
import { SurveyContentService } from './services/survey-content.service';
import { Page, SurveyContent } from './types';
import { filter } from 'rxjs';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LogoandtitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private router: Router) {
    let surveyContentService = inject(SurveyContentService);
    document.onvisibilitychange = () => {
      localStorage.setItem(surveyContentService.examName, JSON.stringify(surveyContentService.responses));
      if (document.visibilityState === "hidden") {
        const sessionTime = Date.now() - this.startTime;
        this.totalTime += sessionTime;
        localStorage.setItem("totalTime", String(this.totalTime));
      } else {
        this.startTime = Date.now();
      }
    };
    router.events.pipe(filter(e => e.type === 1)).subscribe(e => {
      let arr = e.url.match(/\d+$/)
      if (arr) this.currentPage.set(Number(arr[0]))
    })
  }
  surveyContentService = inject(SurveyContentService);
  examName = signal(this.surveyContentService.getConfig().examName);
  contentService = inject(SurveyContentService);
  navLinks = this.contentService.navLinks;
  currentPage = signal(0);
  startTime = Date.now();
  totalTime = parseInt(localStorage.getItem("totalTime") || "0");

  initSubmissionResult() {
    let result = localStorage.getItem(`${this.examName()}-submission-result`);
    return result && Boolean(result)
  }
  initSubmissionObject() {
    let subObjstring = localStorage.getItem(`${this.examName()}-submission-obj`);
    if (subObjstring) {
      try {
        return JSON.parse(subObjstring)
      } catch (error) {
        return {isSuccess: false, text: ""}
      }
    }
    return {isSuccess: false, text: ""}
  }

  showSubmissionLoadingScreen = signal(false);
  showSubmissionResult = signal(this.initSubmissionResult());
  submissionResultObj = this.initSubmissionObject();
  
  // shouldSubmit: WritableSignal<true | undefined> = signal(undefined);
  // submitSurveyRes = resource({
  //   params: () => this.shouldSubmit(),
  //   loader: ({ abortSignal }) => {

  //   }
  // })
  submitSurvey() {
    let encoder = new TextEncoder()
    let buff = encoder.encode(JSON.stringify(this.surveyContentService.responses));
    let binString = String.fromCodePoint(...buff);
    let encodedString = btoa(binString);
    let timeTaken = Math.floor((this.totalTime + (Date.now() - this.startTime)) / 1000);
    Promise.all([
      fetch(`submission/${encodeURIComponent(this.examName())}?totalTime=${timeTaken}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: encodedString,
    }),
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
    ]).then(results => {
      let response = results[0]
      if (response.ok) {
        this.submissionResultObj.isSuccess = true;
        return new Promise(resolve => resolve("Thank you for taking the time to complete this survey."))
      } else {
        return response.text()
      }
    }).then(text => {
      if (typeof text === "string")  {
        this.submissionResultObj.text = text || "Unknown error encountered, please contact certification@intersystems.com for help.";
      } else {
        this.submissionResultObj.text = "Unknown error encountered, please contact certification@intersystems.com for help."
      }
      localStorage.setItem(`${this.examName()}-submission-result`, "true")
      localStorage.setItem(`${this.examName()}-submission-obj`, JSON.stringify(this.submissionResultObj))
      this.showSubmissionResult.set(true)
    })
    this.showSubmissionLoadingScreen.set(true);
  }
}
