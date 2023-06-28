import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateEmailsDialogComponent } from './duplicate-emails-dialog.component';

describe('DuplicateEmailsDialogComponent', () => {
  let component: DuplicateEmailsDialogComponent;
  let fixture: ComponentFixture<DuplicateEmailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateEmailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateEmailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
