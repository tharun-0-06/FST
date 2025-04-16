import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>Button Click Counter</h1>
      <p>You have clicked the button {{ count }} times.</p>
      <button (click)="incrementCount()">Click Me</button>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count = 0;

  incrementCount() {
    this.count++;
  }
}
