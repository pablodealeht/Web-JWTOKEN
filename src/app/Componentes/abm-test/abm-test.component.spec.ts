import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTestComponent } from './abm-test.component';

describe('AbmTestComponent', () => {
  let component: AbmTestComponent;
  let fixture: ComponentFixture<AbmTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
