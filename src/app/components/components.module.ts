import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChildComponent } from './Child';
import {
  FamilyComponent,
  FamilyComponentHeaderTemplate,
  FamilyComponentDependencies,
} from './Family';
import { FamilyMemberComponent } from './FamilyMember';
import { FatherComponent } from './Father';
import { FormComponent } from './Form';
import { MotherComponent } from './Mother';

@NgModule({
  declarations: [
    FormComponent,
    FamilyComponent,
    ...FamilyComponentDependencies,
    FamilyMemberComponent,
    FatherComponent,
    MotherComponent,
    ChildComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    FormComponent,
    FamilyComponent,
    ...FamilyComponentDependencies,
    FamilyMemberComponent,
    FatherComponent,
    MotherComponent,
    ChildComponent,
  ],
})
export class ComponentsModule {}
