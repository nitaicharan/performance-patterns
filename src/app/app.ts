import { Component, inject, NgZone } from '@angular/core';
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
        [data]="salesList"
        department="Sales"
        (add)="salesList = add(salesList, $event)"
        (remove)="salesList = remove(salesList, $event)"
      ></app-employee-list>

      <app-employee-list
        [data]="rndList"
        department="R&D"
        (add)="rndList = add(rndList, $event)"
        (remove)="rndList = remove(rndList, $event)"
      ></app-employee-list>
    </section>
  `,
  styleUrl: './app.css',
})
export class App {
  private readonly ngZone = inject(NgZone);
  private readonly generator = new ListGenerator();
  salesList = List(Sales);
  rndList = List(Rnd);
  label = '';

  ngOnInit() {
    const data: [{ x: string[]; y: number[]; type: 'bar' }] = [
      {
        x: [],
        y: [],
        type: 'bar',
      },
    ];

    const values = new Map<number, number>();
    this.salesList.concat(this.rndList).forEach((employee) => {
      if (values.has(employee.num)) {
        values.set(employee.num, values.get(employee.num)! + 1);
      } else {
        values.set(employee.num, 1);
      }
    });

    for (const entity of values.entries()) {
      data[0].x.push(entity[0].toString());
      data[0].y.push(entity[1]);
    }

    this.ngZone.runOutsideAngular(() => Plotly.newPlot('chart', data as any));
  }

  add(list: List<EmployeeData>, name: string) {
    return list.unshift({ label: name, num: this.generator.generateNumber(NumRange) });
  }

  remove(list: List<EmployeeData>, node: EmployeeData) {
    return list.splice(list.indexOf(node), 1);
  }
}
