const user =
    [{
      "name": "John Doe",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "password": "securepassword123"
    },
    {
        "name":"Tanvi",
        "username":"tanvi",
        "email":"tanvi@gmail.com",
        "password":"gbhjnk"
    }];

// localStorage.setItem('Key' , JSON.stringify(user) );
// const output = JSON.parse(localStorage.getItem('key'));
// console.log(output);



// function saveUser(newuser){
//     let stored = JSON.parse(localStorage.getItem('user'));
//     stored.push(newuser);

//     localStorage.setItem('user', JSON.stringify(stored));
    
// }
// const newuser={
//     "name":"geetika",
//     "username":"pranshu",
//     "email":"vgdh@gmail.com",
//     "password":"asdcvf"
// };
// saveUser(newuser);

// let result=JSON.parse(localStorage.getItem('user'));
// console.log(result);





function getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const show = localStorage.getItem('user');
        resolve(show ? JSON.parse(show) : []);
      }, 500);
    });
  }
console.log(getUser());
