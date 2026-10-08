import { Component, EnvironmentInjector, inject, signal, WritableSignal } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { IonicTabs } from '@org/ionicComponents';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonicTabs],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square });
  }
  public tabs = [
    {
      tabName: 'tab1',
      href: '/tabs/tab1',
      label: 'Tab 10',
      icon: 'home',
    },
    {
      tabName: 'tab2',
      href: '/tabs/tab2',
      label: 'Tab 2',
      icon: 'ellipse',
    },
    {
      tabName: 'tab3',
      href: '/tabs/tab3',
      label: 'Tab 3',
      icon: 'square',
    },
    {
      tabName: 'tab1',
      href: '/tabs/tab1',
      label: 'Tab 4',
      icon: 'ellipse',
    },
  ];
}
