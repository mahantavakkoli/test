import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicPersianDatepicker } from './ionic-persian-datepicker';

@Component({
  imports: [IonicPersianDatepicker],
  template: `<lib-ionic-persian-datepicker
    [value]="value()"
    (valueChange)="value.set($event)"
    [showTime]="showTime()"
  />`,
})
class HostComponent {
  value = signal('');
  showTime = signal(true);
}

describe('IonicPersianDatepicker', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    const picker = fixture.debugElement.children[0].componentInstance as IonicPersianDatepicker;
    expect(picker).toBeTruthy();
  });

  it('publishes a default value when the incoming value is empty', async () => {
    expect(host.value()).not.toBe('');

    const parsed = new Date(host.value());
    expect(Number.isNaN(parsed.getTime())).toBe(false);
  });

  it('keeps the value stable (no emit loop) after publishing the default', async () => {
    const first = host.value();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.value()).toBe(first);
  });

  it('defaults to the host wall-clock time, not UTC', async () => {
    const localNow = new Date();
    const emitted = new Date(host.value());

    // The emitted value stores the wall-clock numbers in its UTC fields, so an
    // untouched picker must agree with the host clock on the hour and day.
    expect(emitted.getUTCHours()).toBe(localNow.getHours());
    expect(emitted.getUTCDate()).toBe(localNow.getDate());
    expect(emitted.getUTCMonth()).toBe(localNow.getMonth());
  });

  it('syncs the picker selection from a provided value', async () => {
    host.value.set('2025-12-12T18:18:00.000Z');
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const picker = fixture.debugElement.children[0].componentInstance as IonicPersianDatepicker;
    expect(picker.selected()).toEqual({ year: 1404, month: 9, day: 21 });
    expect(picker.selectedTime()).toEqual({ hour: 18, minute: 18 });
  });
});
