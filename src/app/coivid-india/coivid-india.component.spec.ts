import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoividIndiaComponent } from './coivid-india.component';

describe('CoividIndiaComponent', () => {
  let component: CoividIndiaComponent;
  let fixture: ComponentFixture<CoividIndiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoividIndiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoividIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
