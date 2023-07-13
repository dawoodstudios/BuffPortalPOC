import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleGuideRoutingModule } from './style-guide-routing.module';
import { StyleGuideComponent } from './style-guide.component';


@NgModule({
  declarations: [
    StyleGuideComponent
  ],
  imports: [
    CommonModule,
    StyleGuideRoutingModule
  ]
})
export class StyleGuideModule { }
