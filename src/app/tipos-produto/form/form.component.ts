import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/common/services/toast.service';
import { TipoProdutoService } from 'src/app/services/produto/tipo-produto.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  operacao = 'Cadastro';
  formTipoProduto: FormGroup = new FormGroup({});
  tipoProdutoId: number | undefined;

  constructor(
    private tipoProdutoService: TipoProdutoService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.tipoProdutoId = params['id'];
        this.operacao = 'Edição';
        this.tipoProdutoService.buscarTipoProduto(params['id']).subscribe((tipoProduto) => {
          this.formTipoProduto.patchValue(tipoProduto);
        });
      }
    });
  }

  ngOnInit(): void {
    this.formTipoProduto = this.formBuilder.group({
        nome: ['', Validators.required],
        porcentagemImposto: ['', [Validators.required, Validators.min(0)]]
    });
  }

  salvarTipoProduto() {
    if (!this.formTipoProduto.valid) {
      this.toastService.showError('Preencha todos os campos');
      return;
    }

    if (this.operacao === 'Edição') {
      this.atualizarTipoProduto();
      return;
    }

    this.criarTipoProduto();
  }

  criarTipoProduto() {
    this.tipoProdutoService.criarTipoProduto(this.formTipoProduto.value).subscribe(() => {
      this.toastService.showSuccess('Tipo de produto cadastrado com sucesso');
    });

    this.formTipoProduto.reset();
  }

  atualizarTipoProduto() {
    const tipoProdutoRequest = this.formTipoProduto.value;
    tipoProdutoRequest.id = this.tipoProdutoId;
    this.tipoProdutoService.atualizarTipoProduto(tipoProdutoRequest).subscribe(() => {
      this.toastService.showSuccess('Tipo de produto atualizado com sucesso');
    });

    this.router.navigate(['/tipos-produto']);
  }
}
