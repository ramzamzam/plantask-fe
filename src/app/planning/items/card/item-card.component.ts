import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../models/planning.models';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  icons = {
    faPen
  };
  @Input() item: Item;
  @Output() edit = new EventEmitter<Item>();
  constructor() {}

  ngOnInit(): void {
  }

  emitEdit() {
    this.edit.emit(this.item);
  }
}
