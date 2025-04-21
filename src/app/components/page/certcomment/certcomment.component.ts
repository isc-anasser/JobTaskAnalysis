import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CertComment } from '../../../types';

@Component({
  selector: 'cert-certcomment',
  imports: [],
  templateUrl: './certcomment.component.html',
  styleUrl: './certcomment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertcommentComponent {
  commentObj = input.required<CertComment>();
  recordComment(e: Event) {
    this.commentObj().response = (e.target as HTMLTextAreaElement).value
  }
}
