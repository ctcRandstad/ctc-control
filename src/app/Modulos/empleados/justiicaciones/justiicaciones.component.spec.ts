import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustiicacionesComponent } from './justiicaciones.component';

describe('JustiicacionesComponent', () => {
  let component: JustiicacionesComponent;
  let fixture: ComponentFixture<JustiicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustiicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustiicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
