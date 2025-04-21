import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'cert-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {
  htmlInput = input.required<string>();
}
