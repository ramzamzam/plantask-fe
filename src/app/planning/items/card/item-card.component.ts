import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../models/planning.models';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  icons = {
    faPen,
    faTrash,
  };
  @Input() item: Item;
  @Output() action = new EventEmitter<{action: string, data: Item}>();
  constructor() {}

  ngOnInit(): void {
  }

  emitEdit() {
    this.action.emit({
      action: 'edit',
      data: this.item,
    });
  }

  emitDelete() {
    this.action.emit({
      action: 'delete',
      data: this.item,
    });
  }
}
