import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderhfwComponent } from './headerhfw.component';

describe('HeaderhfwComponent', () => {
  let component: HeaderhfwComponent;
  let fixture: ComponentFixture<HeaderhfwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderhfwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderhfwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
