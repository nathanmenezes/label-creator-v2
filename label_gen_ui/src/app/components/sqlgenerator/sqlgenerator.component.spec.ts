import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlgeneratorComponent } from './sqlgenerator.component';

describe('SqlgeneratorComponent', () => {
  let component: SqlgeneratorComponent;
  let fixture: ComponentFixture<SqlgeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SqlgeneratorComponent]
    });
    fixture = TestBed.createComponent(SqlgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
