import { IonicTabs } from './ionic-tabs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IonicTabs', () => {
  let component: IonicTabs;
  let fixture: ComponentFixture<IonicTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(IonicTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
