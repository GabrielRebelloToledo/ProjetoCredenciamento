import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarCredenciamentoComponent } from './lancar-credenciamento.component';

describe('LancarCredenciamentoComponent', () => {
  let component: LancarCredenciamentoComponent;
  let fixture: ComponentFixture<LancarCredenciamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancarCredenciamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarCredenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
