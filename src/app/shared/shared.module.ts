import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { NgZorroModule } from './nz-zorro.module';

const MODULES: any[] = [
  NgPipesModule,
  ReactiveFormsModule,
  CommonModule,
  NgZorroModule,
];
@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
  providers: [],
})
export class SharedModule {}
