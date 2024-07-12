export interface Authors {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ipAddress: string;
}

export const authors = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    gender: 'Male',
    ipAddress: '192.168.1.1'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janesmith@example.com',
    gender: 'Female',
    ipAddress: '192.168.1.2'
  },
  {
    id: 3,
    firstName: 'David',
    lastName: 'Johnson',
    email: 'davidjohnson@example.com',
    gender: 'Male',
    ipAddress: '192.168.1.3'
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Williams',
    email:'sarahwilliams@example.com',
    gender: 'Female',
    ipAddress: '192.168.1.4'
  },
  {
    id: 5,
    firstName: 'Michael',
    lastName: 'Brown',
    email:'michaelbrown@example.com',
    gender: 'Male',
    ipAddress: '192.168.1.5'
  }
];
