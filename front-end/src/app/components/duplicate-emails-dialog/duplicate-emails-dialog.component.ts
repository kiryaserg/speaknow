import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InputType } from "../../shared/input-chip/input-type.enum";
import { EmailType } from "../emails-form/email-type.enum";
import { EmailsType } from "../emails-form/emails-form.component";


interface DialogProps {
  emails: EmailsType[];
  existingEmails: EmailsType[];
}

@Component({
  selector: 'app-duplicate-emails-dialog',
  templateUrl: './duplicate-emails-dialog.component.html',
  styleUrls: ['./duplicate-emails-dialog.component.scss']
})
export class DuplicateEmailsDialogComponent implements OnInit {

  public checkbox = new FormControl(false);

  public emails: EmailsType[] = [];

  public existingEmails: EmailsType[] = [];

  public duplicatedExistingEmails: EmailsType[] = [];

  public duplicatedNewEmails: EmailsType[] = []

  public duplicatedExistingEmailsCount: number = 0;

  public duplicatedNewEmailsCount: number = 0;

  public uniqueNewEmailsCount: number = 0;

  public readonly inputType = InputType;

  public readonly disabledInput = true;

  public readonly disableRemove = true;

  public readonly placeholder = '';

  constructor(
    public dialogRef: MatDialogRef<DuplicateEmailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProps
  ) {}

  ngOnInit(): void {
    this.init();
  }

  public get genericSubTittleText(): string {
    return `You are attempting to add ${this.emails.length} ${this.emails.length === 1 ? 'email' : 'emails'}.`;
  }

  public get subTitleFirstRowText(): string {
    return `The following ${this.duplicatedNewEmailsCount} ${this.duplicatedNewEmailsCount === 1 ? 'email' : 'emails'} are duplicated in your list.`;
  }

  public get subTitleSecondRowText(): string {
    return `The following ${this.duplicatedExistingEmailsCount} ${this.duplicatedExistingEmailsCount === 1 ? 'email' : 'emails'} already exist in the system.`;
  }

  public get submitText(): string {
    return this.checkbox.value ? `Save All Users (${this.emails.length})` : `Save Only unique (${this.uniqueNewEmailsCount})`;
  }

  public closeDialog(isSubmitted = false): void {
    this.dialogRef.close(isSubmitted);
  }

  private init(): void {
    this.existingEmails = this.data.existingEmails;
    this.emails = this.data.emails;

    this.defineDuplicatesForFirstRow();
    this.defineDuplicatesForSecondRow();

    this.uniqueNewEmailsCount = this.emails.filter(email => email.type === EmailType.Default).length;
  }

  private defineDuplicatesForFirstRow(): void {
    this.duplicatedNewEmails = this.emails.filter(email => email.type === EmailType.Duplicate);
    this.duplicatedNewEmailsCount = this.duplicatedNewEmails.length;
  }

  private defineDuplicatesForSecondRow(): void {
    const tempEmailsOnlyNames = this.emails.map(item => item.name);
    this.duplicatedExistingEmails = this.existingEmails.filter(email => tempEmailsOnlyNames.includes(email.name));

    this.duplicatedExistingEmails = [... new Set(this.duplicatedExistingEmails.map(email => email.name))].map(item => ({ name: item, type: EmailType.Duplicate }));
    this.duplicatedExistingEmailsCount = this.duplicatedExistingEmails.length;
  }
}
