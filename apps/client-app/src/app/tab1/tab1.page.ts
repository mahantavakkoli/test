import { AuthService } from '@org/auth';
import { IonToggle } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { Component, inject, signal } from '@angular/core';
import { IonButton, IonContent, ModalController } from '@ionic/angular';
import { IonicPersianDatepickerModal, IonicPicker } from '@org/ionicComponents';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonToggle,
    FormField,
    IonButton,
    IonContent,
    IonContent,
    IonicPicker,
    CommonModule,
    CommonModule,
  ],
})
export class Tab1Page {
  public authService = inject(AuthService);
  public modalCtrl = inject(ModalController);

  formModel = signal({
    date: '',
    option: 'value2',
    active: false,
  });

  form = form(this.formModel);

  options = signal([
    {
      value: 'value1',
      disabled: false,
      name: 'name 1',
    },
    {
      value: 'value2',
      disabled: false,
      name: 'name 2',
    },
  ]);
  constructor() {
    // setTimeout(() => {
    //   this.form.date().value.set('2025-12-12T18:18:00.000Z')
    // }, 3000);
    // setTimeout(() => {
    //   this.options.set([
    //     {
    //       value: 'value0',
    //       disabled: false,
    //       name: 'name 0',
    //     },
    //     {
    //       value: 'value2',
    //       disabled: false,
    //       name: 'name 2',
    //     },
    //   ]);
    //   if (this.form.option().value() === 'value1') {
    //     this.form.option().value.set('value0');
    //   }
    // }, 3000);
    // let data = this.authService.data();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: IonicPersianDatepickerModal,
      componentProps: {
        value: this.formModel().date,
        showTime: true,
      },
      cssClass: 'h-auto custom-auto-height',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data?.date) {
      this.form.date().value.set(data.date);
    }
  }
}
