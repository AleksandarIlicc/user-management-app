import { computed, Injectable, signal } from '@angular/core';
import { ManagedUser } from '../model/IUser';

@Injectable({
  providedIn: 'root',
})
export class UsersSignalService {
  private state = signal<{ managedUsers: ManagedUser[] }>({ managedUsers: [] });

  constructor() {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.state.update((state) => ({
      ...state,
      managedUsers: [
        {
          id: '1',
          name: 'Alice Smith',
          email: 'alice.smith@example.com',
          type: 'individual',
        },
        {
          id: '2',
          name: 'Tech Innovators',
          email: 'contact@techinnovators.com',
          type: 'company',
          pib: '789789',
          mbr: '101010',
        },
        {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          type: 'individual',
        },
        {
          id: '4',
          name: 'Global Solutions',
          email: 'info@globalsolutions.com',
          type: 'company',
          pib: '234234',
          mbr: '345345',
        },
        {
          id: '5',
          name: 'Carol White',
          email: 'carol.white@example.com',
          type: 'individual',
        },
        {
          id: '6',
          name: 'Innovative Minds',
          email: 'support@innovativeminds.com',
          type: 'company',
          pib: '567567',
          mbr: '678678',
        },
        {
          id: '7',
          name: 'David Green',
          email: 'david.green@example.com',
          type: 'individual',
        },
        {
          id: '8',
          name: 'Future Enterprises',
          email: 'sales@futureenterprises.com',
          type: 'company',
          pib: '910910',
          mbr: '112112',
        },
        {
          id: '9',
          name: 'Eva Brown',
          email: 'eva.brown@example.com',
          type: 'individual',
        },
        {
          id: '10',
          name: 'NextGen Corp',
          email: 'hello@nextgencorp.com',
          type: 'company',
          pib: '131313',
          mbr: '141414',
        },
      ],
    }));
  }

  managedUsers = computed(() => this.state().managedUsers);
}
