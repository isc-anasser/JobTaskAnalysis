import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MultipleChoice } from '../../../types';
import { SurveyContentService } from '../../../services/survey-content.service';

@Component({
  selector: 'cert-multiplechoice',
  imports: [],
  templateUrl: './multiplechoice.component.html',
  styleUrl: './multiplechoice.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplechoiceComponent {
  question = input.required<MultipleChoice>();
  requireComment = signal(false);
  service = inject(SurveyContentService);
  responses = this.service.responses
  savedResponse = computed(()=>{
    //Get the saved response from local storage and use that 
    let savedResponseTemp = this.responses.mc[this.question().id] as MultipleChoice
    if (savedResponseTemp) {
      this.question().comment = savedResponseTemp.comment;
      this.question().hasComment = savedResponseTemp.hasComment;
      this.question().response = savedResponseTemp.response;
      //The below is done to make sure that the saved response has the up-to-date question and altenrative in case the design changes
      this.responses.mc[this.question().id] = this.question()
      return this.responses.mc[this.question().id] as MultipleChoice
    } else {
      return this.question()
    }
    
  })
  recordResponse (e: Event) {
    if ((e.target as HTMLInputElement).value.startsWith("Other (Please Specifiy)")) {
      this.requireComment.set(true)
    } else {
      this.requireComment.set(false)
    }
    this.question().response = (e.target as HTMLInputElement).value;
    this.responses.mc[this.question().id] = this.question();
  }
  recordComment (e: Event) {
    this.question().comment = (e.target as HTMLInputElement).value;
    this.responses.mc[this.question().id] = this.question();
  }
  selectInput(e: Event) {
    (e.target as HTMLDivElement).querySelector('input')!.checked = true;
  }
}
