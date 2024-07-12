import { Component } from '@angular/core';
import {Authors, authors} from "../authors";

/**
 * Parent component sẽ xử lý các sự kiện được yêu cầu từ Child component
 */
@Component({
  selector: 'author-list',
  template: `
    <strong>output-binding</strong>
    <author-details
      *ngFor="let author of authors" [author]="author"
      (selectAuthor)="onSelectedAuthor($event)"
      (deleteAuthor)="onDeleteAuthor($event)">
    </author-details>
    <br>
    <div>Current selected author: {{ currentAuthor?.firstName }} {{ currentAuthor?.lastName }}</div>
  `,
})
export class AuthorListComponent {
  authors = authors;
  currentAuthor? = authors[0];

  onSelectedAuthor(selectedAuthor: Authors) {
    this.currentAuthor = selectedAuthor;
  }

  onDeleteAuthor(id: number) {
    this.authors = this.authors.filter((auther: Authors) => auther.id !== id)

    // nếu xóa phần tử đầu tiên thì sẽ select authors[0] của mảng mới
    if(this.currentAuthor?.id === id) {
      this.currentAuthor = this.authors[0];
    }
  }
}
