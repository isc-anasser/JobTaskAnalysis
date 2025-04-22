import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { KSAGroup } from '../../../types';

@Component({
  selector: 'cert-ksagroup',
  imports: [],
  templateUrl: './ksagroup.component.html',
  styleUrl: './ksagroup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KsagroupComponent {
  ksaGroupObj = input.required<KSAGroup>();
  recordComment(e: Event) {
    this.ksaGroupObj().comment = (e.target as HTMLTextAreaElement).value
  }
}
