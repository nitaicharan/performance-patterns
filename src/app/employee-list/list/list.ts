import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { EmployeeData } from '../../shared/list-generator.service';
import { List as ListImmutable } from 'immutable';

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Component({
  selector: 'app-list',
  imports: [FormsModule, MatFormFieldModule, MatListModule, MatInputModule, MatChipsModule],
  template: `
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './list.css',
})
export class List {
  @Input() data: ListImmutable<EmployeeData> | null = null;
  @Output() remove = new EventEmitter<EmployeeData>();

  calculate(num: number) {
    return fibonacci(num);
  }
}
