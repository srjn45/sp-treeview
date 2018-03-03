import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpTreeviewNodeComponent } from './sp-treeview-node.component';

describe('SpTreeviewNodeComponent', () => {
  let component: SpTreeviewNodeComponent;
  let fixture: ComponentFixture<SpTreeviewNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpTreeviewNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpTreeviewNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
