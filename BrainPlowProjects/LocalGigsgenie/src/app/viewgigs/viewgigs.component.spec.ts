import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgigsComponent } from './viewgigs.component';

describe('ViewgigsComponent', () => {
  let component: ViewgigsComponent;
  let fixture: ComponentFixture<ViewgigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewgigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewgigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
