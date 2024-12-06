import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { UtilsService } from '../../services/utils.service';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      // add utils service to providers when we dont need to mock it and the service doesnt change our behavior of the component
      providers: [UtilsService],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 50;
    component.limit = 10;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pagination', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );

    expect(pageContainers.length).toBe(5);
    expect(pageContainers[0].nativeElement.textContent).toContain('1');
  });

  it('should emit page change event', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );
    let clickedPage: number | undefined;

    component.pageChangeEvent
      .pipe(first())
      .subscribe((page) => (clickedPage = page));

    // one way to write the below line is
    // pageContainers[0].nativeElement.click();

    // another way to write the below line is
    pageContainers[0].triggerEventHandler('click');

    expect(clickedPage).toEqual(1);
  });
});
