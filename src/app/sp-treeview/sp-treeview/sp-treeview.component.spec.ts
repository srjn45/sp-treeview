import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpTreeviewComponent } from './sp-treeview.component';

describe('SpTreeviewComponent', () => {
  let component: SpTreeviewComponent;
  let fixture: ComponentFixture<SpTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
