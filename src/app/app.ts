import {
  Component,
  inject,
  NgZone,
  signal,
  computed,
  effect,
  WritableSignal,
  afterNextRender,
} from '@angular/core';
import { EmployeeData, ListGenerator } from './shared/list-generator.service';
import { Sales } from './data/sales-70-27-30';
import { Rnd } from './data/rnd-70-27-30';
import { EmployeeListComponent } from './employee-list/employee-list';
import * as Plotly from 'plotly.js-dist-min';
import { List } from 'immutable';

const NumRange: [number, number] = [23, 28];

@Component({
  selector: 'app-root',
  imports: [EmployeeListComponent],
  template: `
    <section class="overview">
      <h1>Overview</h1>
      <div id="chart"></div>
    </section>
    <section class="details">
      <app-employee-list
        [data]="salesList()"
        [department]="'Sales'"
        (add)="handleAdd(salesList, $event)"
        (remove)="handleRemove(salesList, $event)"
      />

      <app-employee-list
        [data]="rndList()"
        [department]="'R&D'"
        (add)="handleAdd(rndList, $event)"
        (remove)="handleRemove(rndList, $event)"
      />
    </section>
  `,
  styleUrl: './app.css',
})
export class App {
  private readonly ngZone = inject(NgZone);
  private readonly generator = new ListGenerator();

  salesList = signal(List(Sales));
  rndList = signal(List(Rnd));

  allEmployees = computed(() => this.salesList().concat(this.rndList()));

  chartData = computed(() => {
    const values = new Map<number, number>();
    this.allEmployees().forEach((employee) => {
      values.set(employee.num, (values.get(employee.num) ?? 0) + 1);
    });

    const x: string[] = [];
    const y: number[] = [];

    for (const [num, count] of values.entries()) {
      x.push(num.toString());
      y.push(count);
    }

    return [{ x, y, type: 'bar' as const }];
  });

  private chartInitialized = signal(false);

  constructor() {
    afterNextRender(() => {
      this.ngZone.runOutsideAngular(() => {
        Plotly.newPlot('chart', this.chartData() as any);
        this.chartInitialized.set(true);
      });
    });

    effect(() => {
      const data = this.chartData();
      if (this.chartInitialized()) {
        this.ngZone.runOutsideAngular(() => {
          Plotly.react('chart', data as any);
        });
      }
    });
  }

  handleAdd(listSignal: WritableSignal<List<EmployeeData>>, name: string) {
    listSignal.update((list) =>
      list.unshift({ label: name, num: this.generator.generateNumber(NumRange) }),
    );
  }

  handleRemove(listSignal: WritableSignal<List<EmployeeData>>, node: EmployeeData) {
    listSignal.update((list) => list.splice(list.indexOf(node), 1));
  }
}
