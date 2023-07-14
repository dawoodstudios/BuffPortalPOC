import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleGuideRoutingModule } from './style-guide-routing.module';
import { StyleGuideComponent } from './style-guide.component';
import { AngularMaterialModule } from './../angular-material.module';

@NgModule({
  declarations: [
    StyleGuideComponent,
  ],
  imports: [
    CommonModule,
    StyleGuideRoutingModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StyleGuideModule { }
