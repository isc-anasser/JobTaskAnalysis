import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'cert-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  // exam = input('Test Placeholder')
}
