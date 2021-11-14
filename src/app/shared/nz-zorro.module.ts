import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';

const MODULES: any[] = [
  NzInputModule,
  NzStepsModule,
  NzFormModule,
  NzButtonModule,
  NzInputNumberModule,
  NzSelectModule,
  NzDatePickerModule,
  NzTableModule,
  NzIconModule,
  NzDescriptionsModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class NgZorroModule {}
