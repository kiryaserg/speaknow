import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from "@angular/material/chips";
import { ValidationUtils } from "../../utils/validation.utils";
import { InputType } from "./input-type.enum";


export interface ItemType {
  name: string,
  type: string
}

@Component({
  selector: 'app-input-chip',
  templateUrl: './input-chip.component.html',
  styleUrls: ['./input-chip.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InputChipComponent {
  @Input() public inputLabel: string = 'Favorite items';

  @Input() public items: ItemType[] = [];

  @Input() public emailValidation: boolean = true;

  @Input() public type: InputType = InputType.input;

  @Input() public placeholder: string = '';

  @Input() public disable: boolean = false;

  @Input() public disableRemove: boolean = false;

  @Output()
  public addEvent: EventEmitter<ItemType> = new EventEmitter()

  @Output()
  public editEvent: EventEmitter<ItemType> = new EventEmitter()

  @Output()
  public removeEvent: EventEmitter<ItemType> = new EventEmitter()

  @Output()
  public itemsWasChangedEvent: EventEmitter<ItemType[]> = new EventEmitter()

  public readonly addOnBlur = true;

  public readonly inputType = InputType;

  public readonly separatorKeysCodes = [ENTER, COMMA];

  public add(event: MatChipInputEvent): void {
    const newItem = (event.value || '').trim();

    // Specific logic for emails
    if (newItem) {
      if (this.emailValidation) {
        if (ValidationUtils.validateEmail(newItem)) {
          this.items.push({ name: newItem, type: 'Default' })
        }
      } else {
        this.items.push({ name: newItem, type: 'Default' });
      }
    }

    this.addEvent.emit({ name: newItem, type: 'Default' });
    this.itemsWasChangedEvent.emit(this.items);
    // Clear the input value
    event.chipInput!.clear();
  }

  public edit(item: ItemType, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    // Remove item if it no longer has a name
    if (!value) {
      this.remove(item);
      return;
    }

    // Edit existing item
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items[index].name = value;
      this.editEvent.emit(item);
    }

    this.itemsWasChangedEvent.emit(this.items);
  }

  public remove(item: ItemType): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);

      this.removeEvent.emit(item);
      this.itemsWasChangedEvent.emit(this.items);
    }
  }
}

