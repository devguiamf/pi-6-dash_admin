import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuatedRegistrationComponent } from './continuated-registration.component';

describe('ContinuatedRegistrationComponent', () => {
  let component: ContinuatedRegistrationComponent;
  let fixture: ComponentFixture<ContinuatedRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuatedRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinuatedRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
