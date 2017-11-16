import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketmessagingComponent } from './websocketmessaging.component';

describe('WebsocketmessagingComponent', () => {
  let component: WebsocketmessagingComponent;
  let fixture: ComponentFixture<WebsocketmessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsocketmessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsocketmessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
