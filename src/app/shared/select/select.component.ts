import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() title:string = '';
  @Input() data:any[] = [];
  @Input() all:boolean = true;
  @Input() select:any = ''
  @Output() selected = new EventEmitter();
  @Input() detectChanges(event:any){
  this.selected.emit(event);
  }

}
