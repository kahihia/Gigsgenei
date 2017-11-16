import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderflComponent } from './headerfl.component';

describe('HeaderflComponent', () => {
  let component: HeaderflComponent;
  let fixture: ComponentFixture<HeaderflComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderflComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
