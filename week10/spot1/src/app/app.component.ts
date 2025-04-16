import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>Text Box Content Display</h1>
      <input type="text" [(ngModel)]="textContent" placeholder="Type something..." />
      <p>You entered: {{ textContent }}</p>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textContent = '';
}
