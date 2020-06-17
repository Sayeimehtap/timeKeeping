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
      "space": 0,
      "imageSrc": "assets/notification.svg",
      "imageHeight": 154,
      "imageWidth": 154,
      "showImage": false,
      "showUnits": true,
      "showBackground": true,
      "responsive": true,
      "animation": false
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
