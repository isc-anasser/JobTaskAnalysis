import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { KSA } from '../../../types';
import { JtaRowComponent } from './jta-row/jta-row.component';

@Component({
  selector: 'cert-ksa',
  imports: [JtaRowComponent],
  templateUrl: './ksa.component.html',
  styleUrl: './ksa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KsaComponent {
  ksaObj = input.required<KSA>();
  
}
