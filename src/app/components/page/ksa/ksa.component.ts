import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input } from '@angular/core';
import { KSA } from '../../../types';
import { DivRowComponent } from './div-row/div-row.component';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { SurveyContentService } from '../../../services/survey-content.service';

@Component({
  selector: 'cert-ksa',
  imports: [DivRowComponent],
  templateUrl: './ksa.component.html',
  styleUrl: './ksa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KsaComponent {
  constructor(private router: Router, private viewportScroller: ViewportScroller,
    changeDetectorRef: ChangeDetectorRef) {
    router.events.pipe(filter(event => event.type === 1)).subscribe(e => {
      // if (e.position) {
      //   viewportScroller.scrollToPosition(e.position);
      // }
      // globalThis.scrollTo(0,0)
      // console.log("logging e", e)
      document.body.scrollTo({
        top: 250,
      });
    });
  }
  ksaObj = input.required<KSA>();
  //Page title contains the id of the KSA Group which will be used to uniquely identify the KSA
  pageTitle = input.required<string>();
  KSAGroupID = computed(()=>{
    let arr = this.pageTitle().match(/^\d+/);
    if (arr) return arr[0]
    else return undefined
  });


  // ngAfterViewInit() {
  //   document.body.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }

  // afterNextRender() {
  //   document.body.scrollBy(0, -1000)
  // }




}
