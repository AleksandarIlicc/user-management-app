import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagedUser } from '../../model/IUser';

@Component({
  selector: 'app-observable-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './observable-user-list.component.html',
  styleUrl: './observable-user-list.component.css',
})
export class ObservableUserListComponent {
  @Input() users: ManagedUser[] | undefined = [];
}
