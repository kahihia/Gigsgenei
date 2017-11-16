import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakegigsComponent } from './makegigs.component';

describe('MakegigsComponent', () => {
  let component: MakegigsComponent;
  let fixture: ComponentFixture<MakegigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakegigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakegigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
