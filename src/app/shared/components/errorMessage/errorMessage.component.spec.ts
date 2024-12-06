import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './errorMessage.component';
import { By } from '@angular/platform-browser';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default error state', () => {
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );

    expect(messageContainer.nativeElement.textContent).toBe(
      'Something went wrong'
    );
  });

  it('renders custom error message', () => {
    // below commented code is for pre signal based @Input() decorator
    // component.messsage = 'Custom error message';

    // below code is for new signal based input() decorator
    fixture.componentRef.setInput('message', 'Custom error message');

    fixture.detectChanges();

    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );

    expect(messageContainer.nativeElement.textContent).toBe(
      'Custom error message'
    );
  });
});
