import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'cert-logoandtitle',
  imports: [],
  templateUrl: './logoandtitle.component.html',
  styleUrl: './logoandtitle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoandtitleComponent {
  surveyTitle = input.required<string>()
}
