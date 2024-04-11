import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  onSearch($event: any) {
    this.searchEvent.emit($event.target.value);
  }
}
