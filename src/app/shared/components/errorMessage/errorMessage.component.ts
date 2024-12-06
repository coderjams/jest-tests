import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `<div data-testid="message-container">{{ message() }}</div>`,
  standalone: true,
})
export class ErrorMessageComponent {
  message = input('Something went wrong');
}
