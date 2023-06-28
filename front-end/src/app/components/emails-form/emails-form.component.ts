import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ItemType } from "../../shared/input-chip/input-chip.component";
import { DuplicateEmailsDialogComponent } from "../duplicate-emails-dialog/duplicate-emails-dialog.component";
import { EmailType } from "./email-type.enum";


export interface EmailsType {
  type: EmailType,
  name: string,
}

@Component({
  selector: 'app-emails-form',
  templateUrl: './emails-form.component.html',
  styleUrls: ['./emails-form.component.scss']
})
export class EmailsFormComponent implements OnInit {
  public existingEmails: EmailsType[] = [
    { name: '2@gmail.com', type: EmailType.Default},
    { name: '4@gmail.com', type: EmailType.Default},
    { name: '6@gmail.com', type: EmailType.Default},
    { name: '6@gmail.com', type: EmailType.Default}
  ];

  public emails: EmailsType[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.recalculateDuplicates();
  }

  public get emailsName(): string [] {
    return this.emails.map(email => email.name);
  }

  public get existingEmailsName(): string [] {
    return this.existingEmails.map(email => email.name);
  }

  public get disableSubmit(): boolean {
    return this.emails.length === 0;
  }

  public recalculateDuplicates(items: ItemType[] = this.emails): void {
    this.emails = <EmailsType[]>items.map((email) => {
      const hasDuplicateInsideNewEmails = this.emailsName.filter(item => item === email.name).length >= 2;
      const hasDuplicateInsideExistingEmails = this.existingEmailsName.includes(email.name)

      if (hasDuplicateInsideNewEmails || hasDuplicateInsideExistingEmails) {
        return { name: email.name, type: EmailType.Duplicate }
      }

      return email;
    })
  }

  public submit(): void {
    const dialogConfig = {
      data: {
        emails: this.emails,
        existingEmails: this.existingEmails
      }
    };

    if (this.emails.some(email => email.type === EmailType.Duplicate)) {
      this.dialog.open(DuplicateEmailsDialogComponent, dialogConfig).afterClosed().subscribe((isSubmitted) => {
        if (isSubmitted) {
          this.snackBar.open('Send request to the server.', 'Save');
          this.emails = [];
        }
      })
    } else {
      this.snackBar.open('Send request to the server.', 'Save');
      this.emails = [];
    }
  }
}
