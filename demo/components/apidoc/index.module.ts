import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { BaiduMapModule } from '../../../src'
import { SharedModule } from '../../shared/index.module'

import { ApidocRouteModule } from './route.module'

import { DocBaidumapComponent } from './docBaidumap.component'
import { DocControlComponent } from './docControl.component'
import { DocMarkerComponent } from './docMarker.component'
import { ApidocComponent } from './index.component'
import { SidebarComponent } from './sidebar.component'

@NgModule({
  declarations: [
    ApidocComponent,
    SidebarComponent,
    DocBaidumapComponent,
    DocMarkerComponent,
    DocControlComponent
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    SharedModule,
    BaiduMapModule.forRoot({ ak: 'gd0GyxGUxSCoAbmdyQBhyhrZ' }),
    ApidocRouteModule
  ]
})
export class ApidocModule {}
