import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TargetItem } from '../../../../types';

@Component({
  selector: '[cert-jta-row]',
  imports: [],
  templateUrl: './jta-row.component.html',
  styleUrl: './jta-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JtaRowComponent {
  targetItem = input.required<TargetItem>();
  applicabilityOptions = ["Do", "Supervise", "N/A"];
  difficultyOptions = ["Very Easy", "Easy", "Moderate", "Difficult", "Very Difficult"];
  importanceOptions = ["Very Unimportant", "Unimportant", "Neutral", "Important", "Very Important"];
  frequencyOptions = ["Yearly", "Quarterly", "Monthly", "Weekly", "Daily"];

  recordResponse(e: Event, attr: string) {
    switch (attr) {
      case "applicability":
        this.targetItem().scores.applicability = (e.target as HTMLInputElement).value
        break;
      case "difficulty":
        this.targetItem().scores.difficulty = (e.target as HTMLInputElement).value
        break;
      case "importance":
        this.targetItem().scores.importance = (e.target as HTMLInputElement).value
        break;
      case "frequency":
        this.targetItem().scores.frequency = (e.target as HTMLInputElement).value
        break;
    }
    
  }
}
