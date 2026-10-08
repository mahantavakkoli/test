import { IonicPersianDatepickerModal } from './ionic-persian-datepicker-modal';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IonicPersianDatepickerModal', () => {
  let component: IonicPersianDatepickerModal;
  let fixture: ComponentFixture<IonicPersianDatepickerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicPersianDatepickerModal],
    }).compileComponents();

    fixture = TestBed.createComponent(IonicPersianDatepickerModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
