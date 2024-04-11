import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent {
  constructor() { }

  @Input() title: string = 'Teste';
  @Input() icon: string = 'produto-icon.png';
  @Input() formRoute: string = '';
}
