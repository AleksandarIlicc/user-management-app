import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalUserListComponent } from '../../components/signal-user-list/signal-user-list.component';
import { UserService } from '../../services/user.service';
import { UserResponse } from 'src/app/model/IApiResponse';

@Component({
  selector: 'app-signal-user-list-page',
  standalone: true,
  imports: [CommonModule, SignalUserListComponent],
  templateUrl: './signal-user-list-page.component.html',
  styleUrl: './signal-user-list-page.component.css',
})
export class SignalUserListPageComponent {
  userService: UserService = inject(UserService);
  userResponse: Signal<UserResponse> = this.userService.getAllUsersWithSignal();
}
