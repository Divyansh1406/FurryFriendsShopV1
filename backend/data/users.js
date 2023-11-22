import bcrypt from 'bcryptjs';

const users=[
    {
    name:"Admin user",
    email:"adminuser@email.com",
    password: bcrypt.hashSync('123456',10),
    isAdmin:true,
},
    {
    name:"Pranjal Singh",
    email:"pranjal@mail.com",
    password:bcrypt.hashSync('123456',10),
    isAdmin: false,
},
    {
    name:"Divyansh Vashist",
    email:"badmaash@mail.com",
    password: bcrypt.hashSync('123456',10),
    isAdmin: false,
},
];

export default users;