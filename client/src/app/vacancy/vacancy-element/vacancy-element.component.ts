import { Component, Input } from '@angular/core';
import { VacancyDetail } from '../vacancy-detail.model';

@Component({
  selector: 'app-vacancy-element',
  templateUrl: './vacancy-element.component.html',
  styleUrls: ['./vacancy-element.component.css']
})
export class VacancyElementComponent {

  @Input()
  vacancy: VacancyDetail;

}
