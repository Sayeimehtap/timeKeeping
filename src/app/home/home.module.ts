import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

    NgCircleProgressModule.forRoot({
      "space": -11,
      "showImage": false,
      "showUnits": true,
      "showSubtitle": false,
      "showBackground": true,
      "responsive": true,
      "animation": false,
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
