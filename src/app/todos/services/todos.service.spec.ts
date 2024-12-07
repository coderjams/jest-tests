import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { FilterEnum } from '../types/filter.enum';

describe('TodosService', () => {
  let todosService: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3004/todos';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    todosService = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todosService).toBeTruthy();
  });

  it('sets initial data', () => {
    expect(todosService.apiBaseUrl).toEqual(baseUrl);
    expect(todosService.todosSig()).toEqual([]);
    expect(todosService.filterSig()).toEqual(FilterEnum.all);
  });

  describe('changeFilter', () => {
    it('changes the filter', () => {
      todosService.changeFilter(FilterEnum.active);
      expect(todosService.filterSig()).toEqual(FilterEnum.active);
    });
  });

  describe('getTodos', () => {
    it('should get correct data', () => {
      todosService.getTodos();
      const req = httpTestingController.expectOne(baseUrl);
      req.flush([{ id: '1', text: 'foo', isCompleted: true }]);
      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'foo', isCompleted: true },
      ]);
    });
  });

  describe('addTodos', () => {
    it('should add todo', () => {
      todosService.addTodo('foo');
      const req = httpTestingController.expectOne(baseUrl);
      req.flush({ id: '1', text: 'foo', isCompleted: true });
      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'foo', isCompleted: true },
      ]);
    });
  });

  describe('changeTodo', () => {
    it('should change todo', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      todosService.changeTodo('1', 'bar');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ id: '1', text: 'bar', isCompleted: true });
      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'bar', isCompleted: true },
      ]);
    });
  });

  describe('removeTodo', () => {
    it('should remove todo', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      todosService.removeTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({});
      expect(todosService.todosSig()).toEqual([]);
    });
  });
  describe('toggleTodo', () => {
    it('should toggle a todo', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      todosService.toggleTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ id: '1', text: 'foo', isCompleted: true });
      expect(todosService.todosSig()).toEqual([
        {
          id: '1',
          text: 'foo',
          isCompleted: true,
        },
      ]);
    });
  });
  describe('toggleTodo', () => {
    it('should toggle a todo', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      todosService.toggleTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ id: '1', text: 'foo', isCompleted: true });
      expect(todosService.todosSig()).toEqual([
        {
          id: '1',
          text: 'foo',
          isCompleted: true,
        },
      ]);
    });
  });
  describe('toggleTodoAll', () => {
    it('should toggle all todos', () => {
      todosService.todosSig.set([
        { id: '1', text: 'foo', isCompleted: false },
        { id: '2', text: 'bar', isCompleted: false },
      ]);
      todosService.toggleAll(true);
      const reqs = httpTestingController.match((request) =>
        request.url.includes(baseUrl)
      );
      reqs[0].flush({ id: '1', text: 'foo', isCompleted: true });
      reqs[1].flush({ id: '2', text: 'bar', isCompleted: true });
      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'foo', isCompleted: true },
        { id: '2', text: 'bar', isCompleted: true },
      ]);
    });
  });
});
