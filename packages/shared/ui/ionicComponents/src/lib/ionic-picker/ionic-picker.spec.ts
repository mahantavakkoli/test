import { IonicPicker } from './Ionic-picker';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IonicPicker', () => {
  let component: IonicPicker;
  let fixture: ComponentFixture<IonicPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(IonicPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
