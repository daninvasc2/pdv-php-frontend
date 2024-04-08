import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  searchInput: string = '';
  constructor() { }

  onSearch() {
    this.searchEvent.emit(this.searchInput);
  }
}
