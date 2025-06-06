import { Component, input, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Comparador } from '../../models/comparador';
import { ServicoBackComponent } from '../servico-back/servico-back.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comparador-carros',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './comparador-carros.component.html',
  styleUrl: './comparador-carros.component.css'
})
export class ComparadorCarrosComponent implements OnInit {
  comparador: Comparador[] = [];
  form!: Comparador;
  carroSelecionado = signal<Comparador | null>(null);
  carro1: Comparador | null = null;
  carro2: Comparador | null = null;

  selectCar = new FormGroup({
    car1Selected: new FormControl<number | null>(null),
    car2Selected: new FormControl<number | null>(null),
  });
  carros = signal<Comparador[] | null>(null)

  constructor(private router: Router, private servicoBack: ServicoBackComponent) { }


  ngOnInit(): void {
    this.pesquisarCarros();
    this.pesquisarCarros2();
  }

  pesquisarCarros(): void {
    this.servicoBack.api_comparador().subscribe({
      next: data => {
        this.carros.set(data.specs)
      },
      error: (err) => {
        console.error('Erro ao carregar carros:', err);
      }
    });

    this.selectCar.controls.car1Selected.valueChanges.subscribe(id => {
      this.carro1 = this.carros()!.find(c => c.id === id) ?? null;
    });
  }

  pesquisarCarros2(): void {
    this.servicoBack.api_comparador().subscribe({
      next: data => {
        this.carros.set(data.specs)
      },
      error: (err) => {
        console.error('Erro ao carregar carros:', err);
      }
    });

    this.selectCar.controls.car2Selected.valueChanges.subscribe(id => {
      this.carro2 = this.carros()!.find(c => c.id === id) ?? null;
    });
  }
}