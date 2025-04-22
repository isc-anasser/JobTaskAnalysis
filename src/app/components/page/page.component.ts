import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SurveyContentService } from '../../services/survey-content.service';
import { CertcommentComponent } from "./certcomment/certcomment.component";
import { MultiplechoiceComponent } from "./multiplechoice/multiplechoice.component";
import { InfoComponent } from "./info/info.component";
import { KsagroupComponent } from "./ksagroup/ksagroup.component";
import { KsaComponent } from "./ksa/ksa.component";

@Component({
  selector: 'cert-page',
  imports: [CertcommentComponent, MultiplechoiceComponent, InfoComponent, KsagroupComponent, KsaComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
  pageIndex = input<number | undefined>(1);
  //If a pageIndex is provided then use that as the pageNumber but if it isn't then default to page 1
  pageNum = computed(() => this.pageIndex()? this.pageIndex()! : 1)
  contentService = inject(SurveyContentService);
  //This is a computed signal because the content of the page rely on the pageNum signal which can change.
  page = computed(() => this.contentService.mappedPagesArray[this.pageNum() - 1]);
}
