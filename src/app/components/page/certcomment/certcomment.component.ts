import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CertComment } from '../../../types';
import { SurveyContentService } from '../../../services/survey-content.service';

@Component({
  selector: 'cert-certcomment',
  imports: [],
  templateUrl: './certcomment.component.html',
  styleUrl: './certcomment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertcommentComponent {
  commentObj = input.required<CertComment>();
  service = inject(SurveyContentService);
  responses = this.service.responses
  savedResponse = computed(()=>{
    if (this.responses.comment[this.commentObj().id]) {
      return (this.responses.comment[this.commentObj().id] as CertComment).response
    }
    return undefined
  })
  characterLimit = 200;
  recordComment(e: Event) {
    this.commentObj().response = (e.target as HTMLTextAreaElement).value;

    this.responses.comment[this.commentObj().id as keyof CertComment] = this.commentObj()
  }
}
