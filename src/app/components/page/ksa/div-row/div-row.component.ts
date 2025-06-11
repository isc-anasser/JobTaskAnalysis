import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TargetItem } from '../../../../types';
import { SurveyContentService } from '../../../../services/survey-content.service';

@Component({
  selector: '[cert-row]',
  imports: [],
  templateUrl: './div-row.component.html',
  styleUrl: './div-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DivRowComponent {
  targetItem = input.required<TargetItem>();
  ksaId = input.required<string>();
  applicabilityOptions = ["Do", "Supervise", "N/A"];
  difficultyOptions = ["Very Easy", "Easy", "Moderate", "Difficult", "Very Difficult"];
  importanceOptions = ["Very Unimportant", "Unimportant", "Neutral", "Important", "Very Important"];
  frequencyOptions = ["Yearly", "Quarterly", "Monthly", "Weekly", "Daily"];

  service = inject(SurveyContentService);
  responses = this.service.responses;
  savedResponse = computed(() => {
    let tempResponse = this.responses.jta[`${this.ksaId()}.${this.targetItem().id}`] as TargetItem
    
    if (tempResponse) {
      this.targetItem().scores = tempResponse.scores
      //Update the text of the target item
      tempResponse.text = this.targetItem().text;
      return tempResponse
    }
    this.responses.jta[`${this.ksaId()}.${this.targetItem().id}`] = this.targetItem()
    return this.targetItem()
  }
  )

  recordResponse(e: Event, attr: string) {
    switch (attr) {
      case "applicability":
        this.savedResponse().scores.applicability = (e.target as HTMLInputElement).value
        break;
      case "difficulty":
        this.savedResponse().scores.difficulty = (e.target as HTMLInputElement).value
        break;
      case "importance":
        this.savedResponse().scores.importance = (e.target as HTMLInputElement).value
        break;
      case "frequency":
        this.savedResponse().scores.frequency = (e.target as HTMLInputElement).value
        break;
    }

  }

  forwardClick(e: Event){
    let input = (e.target as HTMLLabelElement).querySelector("input");
    input?.click()
  }
}
