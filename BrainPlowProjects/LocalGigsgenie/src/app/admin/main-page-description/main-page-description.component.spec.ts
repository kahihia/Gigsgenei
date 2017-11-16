import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageDescriptionComponent } from './main-page-description.component';

describe('MainPageDescriptionComponent', () => {
  let component: MainPageDescriptionComponent;
  let fixture: ComponentFixture<MainPageDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
