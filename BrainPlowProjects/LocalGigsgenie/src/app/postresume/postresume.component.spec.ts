/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostresumeComponent } from './postresume.component';

describe('PostresumeComponent', () => {
  let component: PostresumeComponent;
  let fixture: ComponentFixture<PostresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
