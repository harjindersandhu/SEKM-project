import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {AngularMaterialModule} from "../../angular-material.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        MatProgressSpinnerModule
    ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
