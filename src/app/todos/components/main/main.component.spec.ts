import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TodosService } from '../../services/todos.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { By } from '@angular/platform-browser';
import { TodoComponent } from '../todo/todo.component';

// shallow testing
@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: '',
})
class TodoComponentMock {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        TodosService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .overrideComponent(MainComponent, {
        remove: { imports: [TodoComponent] },
        add: { imports: [TodoComponentMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('componentVisibility', () => {
    it('should be hidden when there are no todos', () => {
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).toEqual(true);
    });
    it('should not be hidden when there are todos', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      fixture.detectChanges();
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).not.toBeDefined();
    });

    it('should highlight toggle all checkbox', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const toggleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );
      expect(toggleAll.nativeElement.checked).toEqual(true);
    });

    it('should toggle all todos', () => {
      jest.spyOn(todosService, 'toggleAll').mockImplementation(() => {});
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const toggleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );
      toggleAll.nativeElement.click();
      expect(todosService.toggleAll).toHaveBeenCalledWith(false);
    });

    it('should render a list of todos', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );
      expect(todos.length).toEqual(1);
      expect(todos[0].componentInstance.todo).toEqual({
        id: '1',
        text: 'foo',
        isCompleted: true,
      });
      expect(todos[0].componentInstance.isEditing).toEqual(false);
    });

    it('should change editingId', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );
      todos[0].componentInstance.setEditingId.emit('1');
      expect(component.editingId).toEqual('1');
    });
  });
});
