import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalUserListComponent } from '../../components/signal-user-list/signal-user-list.component';
import { User } from 'src/app/model/user.model';
import { UsersSignalService } from 'src/app/services/users-signal.service';

@Component({
  selector: 'app-signal-user-list-page',
  standalone: true,
  imports: [CommonModule, SignalUserListComponent],
  templateUrl: './signal-user-list-page.component.html',
  styleUrl: './signal-user-list-page.component.css',
})
export class SignalUserListPageComponent {
  usersSignalService: UsersSignalService = inject(UsersSignalService);
  managedUsers: Signal<User[]> = this.usersSignalService.managedUsers;
}
