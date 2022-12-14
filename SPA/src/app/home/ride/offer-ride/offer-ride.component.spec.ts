/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OfferRideComponent } from './offer-ride.component';

describe('OfferRideComponent', () => {
  let component: OfferRideComponent;
  let fixture: ComponentFixture<OfferRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
