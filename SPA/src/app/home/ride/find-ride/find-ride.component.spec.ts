/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindRideComponent } from './find-ride.component';

describe('FindRideComponent', () => {
  let component: FindRideComponent;
  let fixture: ComponentFixture<FindRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
