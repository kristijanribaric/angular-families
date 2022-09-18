import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChildComponent } from './Child';
import { FamilyComponent } from './Family';
import { FamilyMemberComponent } from './FamilyMember';
import { FatherComponent } from './Father';
import { FormComponent } from './Form';
import { MotherComponent } from './Mother';

@NgModule({
  declarations: [
    FormComponent,
    FamilyComponent,
    FamilyMemberComponent,
    FatherComponent,
    MotherComponent,
    ChildComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    FormComponent,
    FamilyComponent,
    FamilyMemberComponent,
    FatherComponent,
    MotherComponent,
    ChildComponent,
  ],
})
export class ComponentsModule {}
