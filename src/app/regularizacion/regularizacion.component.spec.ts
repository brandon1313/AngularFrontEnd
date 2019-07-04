import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizacionComponent } from './regularizacion.component';

describe('RegularizacionComponent', () => {
  let component: RegularizacionComponent;
  let fixture: ComponentFixture<RegularizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
