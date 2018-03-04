import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpTreeviewDropdownComponent } from './sp-treeview-dropdown.component';

describe('SpTreeviewDropdownComponent', () => {
  let component: SpTreeviewDropdownComponent;
  let fixture: ComponentFixture<SpTreeviewDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpTreeviewDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpTreeviewDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
