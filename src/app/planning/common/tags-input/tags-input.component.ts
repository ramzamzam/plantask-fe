import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true
    }
  ]
})
export class TagsInputComponent implements ControlValueAccessor {
  tag: string;
  tags = [];
  constructor() { }

  addTag() {
    this.tag = this.tag.trim();
    if (this.tag) {
      this.tags.push(this.tag);
      this.onChange(this.tags);
    }
    this.tag = null;
  }

  removeTag(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.onChange(this.tags);
  }

  writeValue(value: any) {
    this.tags = value;
    this.onChange(value);
  }

  onChange = (_) => {};
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
