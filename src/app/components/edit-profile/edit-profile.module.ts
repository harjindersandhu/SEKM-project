import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditProfilePageRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        MatProgressSpinnerModule
    ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
