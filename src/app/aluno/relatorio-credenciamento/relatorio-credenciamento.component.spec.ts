import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioCredenciamentoComponent } from './relatorio-credenciamento.component';

describe('RelatorioCredenciamentoComponent', () => {
  let component: RelatorioCredenciamentoComponent;
  let fixture: ComponentFixture<RelatorioCredenciamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioCredenciamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioCredenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
