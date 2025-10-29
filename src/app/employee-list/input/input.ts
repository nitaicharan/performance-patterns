import { Component, EventEmitter, output, Output, signal } from '@angular/core';
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
        [value]="label()"
        (input)="onChange($event)"
        (keydown.enter)="handleKey()"
      />
    </mat-form-field>
  `,
  styleUrl: './input.css',
})
export class Input {
  label = signal('');
  add = output<string>();

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.label.set(value);
  }

  handleKey() {
    const value = this.label();
    if (value) {
      this.add.emit(value);
      this.label.set('');
    }
  }
}
