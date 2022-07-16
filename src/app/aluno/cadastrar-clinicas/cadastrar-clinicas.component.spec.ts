import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarClinicasComponent } from './cadastrar-clinicas.component';

describe('CadastrarClinicasComponent', () => {
  let component: CadastrarClinicasComponent;
  let fixture: ComponentFixture<CadastrarClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarClinicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
