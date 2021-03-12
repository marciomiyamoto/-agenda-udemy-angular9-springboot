import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['id','nome','email','favorito'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { 
    this.montarFormulario();
    this.listarContatos();
  }

  listarContatos() {
    this.service.list()
    .subscribe( response => {
      this.contatos = response;
    })
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  submit() {
    const formValues = this.formulario.value; 
    const contato: Contato = new Contato(formValues.nome, formValues.email);

    this.service
    .save(contato)
    .subscribe( response => {
      let lista: Contato[] = [...this.contatos, response];
      this.contatos = lista;
    });
  }

  favoritar(contato: Contato) {
    this.service.favourite(contato)
      .subscribe( response => {
        contato.favorito = !contato.favorito;
      });
  }

}
