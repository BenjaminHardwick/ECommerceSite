import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin Ben',
    email: 'admin@ben.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@ben.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@ben.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
