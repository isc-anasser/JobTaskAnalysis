import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { KSAGroup } from '../../../types';
import { SurveyContentService } from '../../../services/survey-content.service';

@Component({
  selector: 'cert-ksagroup',
  imports: [],
  templateUrl: './ksagroup.component.html',
  styleUrl: './ksagroup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KsagroupComponent {
  ksaGroupObj = input.required<KSAGroup>();
  characterLimit = 200;
  service = inject(SurveyContentService);
  responses = this.service.responses
  savedResponse = computed(()=>{
    let tempResponse = this.responses.ksaComment[`${this.ksaGroupObj().id}`] as KSAGroup;
    if (tempResponse) {
      this.ksaGroupObj().comment = tempResponse.comment;
      tempResponse = this.ksaGroupObj()
      return tempResponse
    }
    this.responses.ksaComment[`${this.ksaGroupObj().id}`] = this.ksaGroupObj()
    return this.ksaGroupObj()
  })
  recordComment(e: Event) {
    // this.ksaGroupObj().comment = (e.target as HTMLTextAreaElement).value
    this.savedResponse().comment = (e.target as HTMLTextAreaElement).value
  }
}
