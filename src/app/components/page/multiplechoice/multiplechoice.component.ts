import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { MultipleChoice } from '../../../types';

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
  recordResponse (e: Event) {
    if ((e.target as HTMLInputElement).value.startsWith("Other (Please Specifiy)")) {
      this.requireComment.set(true)
    } else {
      this.requireComment.set(false)
    }
    this.question().response = (e.target as HTMLInputElement).value;
  }
  recordComment (e: Event) {
    this.question().comment = (e.target as HTMLInputElement).value;
  }
  selectInput(e: Event) {
    (e.target as HTMLDivElement).querySelector('input')!.checked = true;
  }
}
