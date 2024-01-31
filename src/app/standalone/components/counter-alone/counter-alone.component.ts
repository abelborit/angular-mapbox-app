import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-alone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.css'],
})
export class CounterAloneComponent {
  /* FORMA 1 */
  // @Input()
  // public counter2: number = 5;

  /* FORMA 2 */
  @Input() counter2: number = 5;

  public counter: number = 0;

  handleIncreaseBy() {
    this.counter++;
  }

  handleOtherIncreaseBy() {
    this.counter2++;
  }
}
