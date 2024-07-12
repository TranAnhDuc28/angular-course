import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Authors} from "../authors";

/**
 * Output Binding trong Angular là một cách để một child component gửi dữ liệu lên parent component của nó.
 * Điều này được thực hiện thông qua EventEmitter và @Output decorator.
 */

@Component({
  selector: 'author-details',
  template: `
    <div *ngIf="author">
      <h2>{{ author.firstName }} {{ author.lastName }}
        <button style="margin-left: 1rem" (click)="handleSelectAuthor(author)">Select</button>
        <button style="margin-left: 1rem" (click)="handleDeleteAuthor(author.id)">Delete</button>
      </h2>
      <p>Email: {{ author.email }} | Gender: {{ author.gender }} | IP Address: {{ author.ipAddress }}</p>
    </div>
  `,
})
export class AuthorDetailsComponent {
  @Input() author?: Authors;

  // những event custom từ child component chuyển nên parent component xử lý
  @Output() selectAuthor = new EventEmitter<Authors>(); // event custom từ child component
  @Output() deleteAuthor = new EventEmitter<number>();

  handleSelectAuthor(author: Authors): void {
    this.selectAuthor.emit(author);
  }

  handleDeleteAuthor(id: number): void {
    this.deleteAuthor.emit(id);
  }
}
