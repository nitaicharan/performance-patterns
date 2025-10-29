import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [FormsModule, MatFormFieldModule, MatListModule, MatInputModule, MatChipsModule],
  template: `
    <mat-form-field appearance="fill" style="--mat-sys-surface-variant: transparent">
      <input
        placeholder="Enter name here"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)"
      />
    </mat-form-field>
  `,
  styleUrl: './input.css',
})
export class Input {
  label: string = '';
  @Output() add = new EventEmitter<string>();

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.add.emit(this.label);
      this.label = '';
    }
  }
}
