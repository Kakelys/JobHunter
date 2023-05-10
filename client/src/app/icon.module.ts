import { NgModule } from "@angular/core";
import { NgIconsModule } from "@ng-icons/core";
import {
  NgxBootstrapIconsModule,
  gear,
  people,
  peopleFill,
  files,
  list,
  telephone,
  globe,
  briefcase,
  briefcaseFill,
  chatDots,
  app,
  envelopePlus,
  send,
  sendFill,
  bookmarkPlusFill,
  bookmarkFill,
} from "ngx-bootstrap-icons";

import { heroPaperAirplane } from "@ng-icons/heroicons/outline";

const icons = {
  gear,
  people,
  peopleFill,
  files,
  list,
  telephone,
  globe,
  briefcase,
  briefcaseFill,
  chatDots,
  app,
  envelopePlus,
  send,
  sendFill,
  heroPaperAirplane,
  bookmarkPlusFill,
  bookmarkFill,
}

//<i-bs name="briefcase-fill"></i-bs>
//<ng-icon name="featherAirplay"></ng-icon>

@NgModule({
  declarations: [

  ],
  imports: [
    NgxBootstrapIconsModule.pick(icons),
    NgIconsModule.withIcons(icons)
  ],
  providers: [
  ],
  exports: [
    NgxBootstrapIconsModule,
    NgIconsModule
  ]
})
export class IconModule {}
