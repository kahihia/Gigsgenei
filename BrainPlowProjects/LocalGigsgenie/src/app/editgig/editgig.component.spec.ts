import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgigComponent } from './editgig.component';

describe('EditgigComponent', () => {
  let component: EditgigComponent;
  let fixture: ComponentFixture<EditgigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditgigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
