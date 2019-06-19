import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePrintRenderComponent } from './schedule-print-render.component';

describe('SchedulePrintRenderComponent', () => {
  let component: SchedulePrintRenderComponent;
  let fixture: ComponentFixture<SchedulePrintRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePrintRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePrintRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
