import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { List, ListItem } from '../../models/planning.models';
import { PlanningService } from '../../services/planning.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  icons = {
    faPen
  };

  @ViewChildren('liinput') rows: QueryList<ElementRef>;
  @Input() list: List;
  @Output() edit = new EventEmitter<List>();
  saveresult = '';

  constructor(
    private planningService: PlanningService
  ) { }

  ngOnInit(): void {
    if(!this.list.listItems.length) { this.list.listItems = [new ListItem()]; }
  }

  createNewAfter(li: ListItem) {
    const currentIndex = this.list.listItems.indexOf(li);
    this.list.listItems.splice(currentIndex + 1, 0, new ListItem());
    setTimeout(() => this.rows.toArray()[currentIndex + 1].nativeElement.focus(), 0);
  }

  removeItem(li: ListItem) {
    if (li.label) { return; }
    if (this.list.listItems.length === 1) { return; }

    const currentIndex = this.list.listItems.indexOf(li);
    this.list.listItems.splice(currentIndex, 1);
    setTimeout(() => {
      const inputs = this.rows.toArray();
      if (inputs[currentIndex]) {
        inputs[currentIndex].nativeElement.focus();
      } else if(inputs[currentIndex - 1]) {
        inputs[currentIndex - 1].nativeElement.focus();
      }
    },0);
  }

  async save() {
    try {
      this.list.listItems = await this.planningService.updateListItems(this.list);
      this.showSaveResult('Saved');
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  showSaveResult(text: string) {
    this.saveresult = text;
    setTimeout(() => this.saveresult = '', 3000);
  }

  emitEdit() {
    this.edit.emit(this.list);
  }
}
