import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EmployeeData } from '../../shared/list-generator.service';
import { List as ListImmutable } from 'immutable';
import { CalculatePipe } from './calculate-pipe';

@Component({
  selector: 'app-list',
  imports: [
    CalculatePipe,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    ScrollingModule,
  ],
  template: `
    <mat-list>
      @if (data()?.size === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
        <mat-list-item *cdkVirtualFor="let item of data(); trackBy: trackByItem">
          <h3 matListItemTitle title="Name" style="display: flex; justify-content: space-between">
            {{ item.label }}

            <mat-chip title="Score">
              {{ item.num | calculate }}
            </mat-chip>
          </h3>
        </mat-list-item>
      </cdk-virtual-scroll-viewport>
      @if ((data()?.size ?? 0) > 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './list.css',
})
export class List {
  data = input<ListImmutable<EmployeeData> | null>(null);
  remove = output<EmployeeData>();

  trackByItem(index: number, item: EmployeeData): string {
    return item.label;
  }
}
