import { Component, input, model, ModelSignal } from '@angular/core';
import { IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/angular';

export interface PickerOption {
  name: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'lib-ionic-picker',
  imports: [IonPicker, IonPickerColumn, IonPickerColumnOption],
  templateUrl: './ionic-picker.html',
  styleUrl: './ionic-picker.scss',
})
export class IonicPicker {
  public value: ModelSignal<string> = model<string>('');
  public options: ModelSignal<Array<PickerOption>> = model<Array<PickerOption>>(new Array<PickerOption>());

  public selectionChanged(event: any): void {
    this.value.set(event.detail.value);
  }
}
