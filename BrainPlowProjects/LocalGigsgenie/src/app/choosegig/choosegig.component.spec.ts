import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosegigComponent } from './choosegig.component';

describe('ChoosegigComponent', () => {
  let component: ChoosegigComponent;
  let fixture: ComponentFixture<ChoosegigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosegigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosegigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
