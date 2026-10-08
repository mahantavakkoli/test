import { Component, inject, model } from '@angular/core';
import { IonButton, IonFooter, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular';
import { IonicPersianDatepicker } from '../ionic-persian-datepicker/ionic-persian-datepicker';

export interface PickerOption {
  name: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'lib-ionic-persian-datepicker-modal',
  imports: [IonHeader, IonToolbar, IonTitle, IonFooter, IonButton, IonicPersianDatepicker],
  templateUrl: './ionic-persian-datepicker-modal.html',
  styleUrl: './ionic-persian-datepicker-modal.scss',
})
export class IonicPersianDatepickerModal {
  private modalController = inject(ModalController);

  /** Initial date passed via componentProps; kept live as the user edits. */
  value = model.required<string>();
  showTime = model(false);

  confirm() {
    this.modalController.dismiss({ date: this.value() }, 'confirm');
  }
}
