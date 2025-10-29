import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { EmployeeData } from '../shared/list-generator.service';
import { MatInputModule } from '@angular/material/input';
import { List } from 'immutable';
import { Input as EmployeeInput } from './input/input';
import { List as ListComponent } from './list/list';

@Component({
  selector: 'app-employee-list',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    EmployeeInput,
    ListComponent,
  ],
  template: `
    <h1 title="Department">{{ department() }}</h1>

    <app-input (add)="add.emit($event)" />
    <app-list [data]="data()" (remove)="remove.emit($event)" />
  `,
  styleUrl: 'employee-list.css',
})
export class EmployeeListComponent {
  data = input<List<EmployeeData> | null>(null);
  department = input<string>('');

  remove = output<EmployeeData>();
  add = output<string>();
}
