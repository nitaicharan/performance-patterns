import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { EmployeeData } from '../shared/list-generator.service';
import { MatInputModule } from '@angular/material/input';
import { List } from 'immutable';

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Component({
  selector: 'app-employee-list',
  imports: [FormsModule, MatFormFieldModule, MatListModule, MatInputModule, MatChipsModule],
  template: `
    <h1 title="Department">{{ department }}</h1>

    <mat-form-field appearance="fill" style="--mat-sys-surface-variant: transparent">
      <input
        placeholder="Enter name here"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)"
      />
    </mat-form-field>

    <mat-list>
      @if (data?.size === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (item of data; track $index) {
        <mat-list-item>
          <h3 matListItemTitle title="Name" style="display: flex; justify-content: space-between">
            {{ item.label }}

            <mat-chip title="Score">
              {{ calculate(item.num) }}
            </mat-chip>
          </h3>
        </mat-list-item>
      }
      @if (data?.size) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  styleUrl: 'employee-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  @Input() data: List<EmployeeData> | null = null;
  @Input() department: string = '';

  @Output() remove = new EventEmitter<EmployeeData>();
  @Output() add = new EventEmitter<string>();

  label: string = '';

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.add.emit(this.label);
      this.label = '';
    }
  }

  calculate(num: number) {
    return fibonacci(num);
  }
}
