import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMunicipiosComponent } from './cadastrar-municipios.component';

describe('CadastrarMunicipiosComponent', () => {
  let component: CadastrarMunicipiosComponent;
  let fixture: ComponentFixture<CadastrarMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarMunicipiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
