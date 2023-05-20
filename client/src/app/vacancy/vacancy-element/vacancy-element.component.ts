import { Component, Input } from '@angular/core';
import { VacancyDetail } from '../vacancy-detail.model';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IconModule } from 'src/app/icon.module';

@Component({
  selector: 'app-vacancy-element',
  templateUrl: './vacancy-element.component.html',
  styleUrls: ['./vacancy-element.component.css']
})
export class VacancyElementComponent {

  @Input()
  vacancy: VacancyDetail;

}
