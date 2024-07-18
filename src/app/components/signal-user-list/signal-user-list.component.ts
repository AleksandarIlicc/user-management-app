import { Component, Input, Signal } from '@angular/core';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signal-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './signal-user-list.component.html',
  styleUrl: './signal-user-list.component.css',
})
export class SignalUserListComponent {
  @Input() users!: User[];
}
