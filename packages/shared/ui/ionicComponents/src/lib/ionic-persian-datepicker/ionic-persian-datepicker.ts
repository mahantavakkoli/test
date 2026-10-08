import { toGregorian, toJalaali, jalaaliMonthLength } from 'jalaali-js';
import { Component, computed, effect, input, model, OnInit, signal } from '@angular/core';
import { IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/angular';

/**
 * The host's current wall-clock time, stored with UTC fields.
 *
 * This component treats a Date's UTC fields as "the wall-clock numbers the user
 * picked" (see `toJalaliDate` and `emitToParent`). Seeding the default from a
 * plain `new Date()` therefore showed the timezone offset as the default time
 * (e.g. 09:51 instead of the host's 13:21 in Iran) and could shift the default
 * day near midnight.
 */
function wallClockNow(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()));
}

@Component({
  selector: 'lib-ionic-persian-datepicker',
  imports: [IonPicker, IonPickerColumn, IonPickerColumnOption],
  templateUrl: './ionic-persian-datepicker.html',
  styleUrl: './ionic-persian-datepicker.scss',
})
export class IonicPersianDatepicker implements OnInit {
  public value = model<string>('');
  public showTime = input<boolean>(false);
  public minuteSteps = input<number>(1);
  private readonly now = wallClockNow();
  public selected = signal<{ year: number; month: number; day: number }>(this.toJalaliDate(this.now));
  public selectedTime = signal<{ hour: number; minute: number }>({
    hour: this.now.getUTCHours(),
    minute: this.now.getUTCMinutes(),
  });

  private minutesArray: Array<number> = Array.from({ length: 60 }, (_, i) => i);

  /** Persian years from now-2 to now+2 (5 items). */
  public yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = this.toJalaliDate(this.now).year - 2 + i;
    return { value: y, name: String(y) };
  });
  public monthOptions = [
    { value: 1, name: 'فروردین' },
    { value: 2, name: 'اردیبهشت' },
    { value: 3, name: 'خرداد' },
    { value: 4, name: 'تیر' },
    { value: 5, name: 'مرداد' },
    { value: 6, name: 'شهریور' },
    { value: 7, name: 'مهر' },
    { value: 8, name: 'آبان' },
    { value: 9, name: 'آذر' },
    { value: 10, name: 'دی' },
    { value: 11, name: 'بهمن' },
    { value: 12, name: 'اسفند' },
  ];
  /** Day options dynamic per month length. Pure computed. */
  public dayOptions = computed(() => {
    const s = this.selected();
    const max = jalaaliMonthLength(s.year, s.month);
    return Array.from({ length: max }, (_, i) => ({
      value: i + 1,
      name: String(i + 1),
    }));
  });
  public hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    name: i.toString().padStart(2, '0'),
  }));

  public minuteOptions: Array<{ value: number; name: string }> = new Array();

  public constructor() {
    this.minutesArray.forEach((item) => {
      if (item % this.minuteSteps() === 0) {
        this.minuteOptions.push({ value: item, name: item.toString().padStart(2, '0') });
      }
    });
    // Sync `selected` (and `selectedTime`) from the parent's `value` whenever it changes.
    effect(() => {
      const v = this.value();
      // An empty value is handled once in ngOnInit (see there): nothing to sync
      // from, and reacting here would fight the default we publish there.
      if (!v) return;
      const inputValue = new Date(v);
      const j = this.toJalaliDate(inputValue);
      const s = this.selected();
      if (j.year !== s.year || j.month !== s.month || j.day !== s.day) {
        this.selected.set(j);
      }
      const time = this.selectedTime();
      if (inputValue.getUTCHours() !== time.hour || inputValue.getUTCMinutes() !== time.minute) {
        this.selectedTime.set({ hour: inputValue.getUTCHours(), minute: inputValue.getUTCMinutes() });
      }
    });
  }

  public ngOnInit(): void {
    // The parent gave us no date, so the columns are showing "now" as their
    // default. Emit that default so the parent (and the surrounding modal/form)
    // receives a value even when the user confirms without touching a column.
    // Without this the picker would stay out of sync with what it displays and
    // an untouched picker would report an empty value.
    if (!this.value()) {
      this.emitToParent();
    }
  }

  /** Convert a Gregorian Date to a {year, month, day} Jalali triple. */
  private toJalaliDate(date: Date): { year: number; month: number; day: number } {
    // Read the UTC calendar components so the Jalali date stays in the same
    // zone-independent "wall-clock" convention as the rest of the component
    // (Date.UTC on emit, getUTC* for the time). Reading local components here
    // shifts the day by one whenever the chosen hour crosses midnight in the
    // host timezone (e.g. 21:00 UTC is 00:30 the next day locally in Iran).
    const t = toJalaali(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    return { year: t.jy, month: t.jm, day: t.jd };
  }

  public onYearChange(event: Event): void {
    const val = (event as CustomEvent).detail.value as number;
    this.selected.update((s) => ({ ...s, year: val }));
    this.clampDay();
    this.emitToParent();
  }

  public onMonthChange(event: Event): void {
    const val = (event as CustomEvent).detail.value as number;
    this.selected.update((s) => ({ ...s, month: val }));
    this.clampDay();
    this.emitToParent();
  }

  public onDayChange(event: Event): void {
    const val = (event as CustomEvent).detail.value as number;
    this.selected.update((s) => ({ ...s, day: val }));
    this.emitToParent();
  }

  public onHourChange(event: Event): void {
    const val = (event as CustomEvent).detail.value as number;
    this.selectedTime.update((t) => ({ ...t, hour: val }));
    this.emitToParent();
  }

  public onMinuteChange(event: Event): void {
    const val = (event as CustomEvent).detail.value as number;
    this.selectedTime.update((t) => ({ ...t, minute: val }));
    this.emitToParent();
  }

  /** Clamp day to the max for the current year+month. */
  private clampDay(): void {
    this.selected.update((s) => {
      const max = jalaaliMonthLength(s.year, s.month);
      return s.day > max ? { ...s, day: max } : s;
    });
  }

  private emitToParent(): void {
    const { year, month, day } = this.selected();
    const g = toGregorian(year, month, day);
    // Build the Date in UTC (Year/Month/Day from Jalali, plus time if enabled),
    // so the string we emit carries exactly the hour/minute the user picked.
    // Matched with the UTC reads in the constructor effect, the value
    // round-trips exactly: what's passed in is what comes out.
    const { hour, minute } = this.showTime() ? this.selectedTime() : { hour: 0, minute: 0 };
    const d = new Date(Date.UTC(g.gy, g.gm - 1, g.gd, hour, minute, 0, 0));
    this.value.set(d.toISOString());
  }
}
