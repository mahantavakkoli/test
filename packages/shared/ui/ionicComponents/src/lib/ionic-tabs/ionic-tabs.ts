import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';

@Component({
  selector: 'lib-ionic-tabs',
  imports: [CommonModule, IonTabs, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  templateUrl: './ionic-tabs.html',
  styleUrl: './ionic-tabs.scss',
})
export class IonicTabs {
  tabs = input(new Array());
}
