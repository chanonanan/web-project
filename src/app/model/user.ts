export class RegisterForm {
    firstname:string;
    lastname:string;
    email:string;
    username:string;
    password:string;
    role_id:number;
}
export class UserModel {
    id:string;
    firstname:string;
    lastname:string;
    email:string;
    username:string;
    password:string;
    role_id:number;
    createdAt:string;
    updatedAt:string;
}

export class ProfileModel {
    id:string;
    firstname:string;
    lastname:string;
    email:string;
    username:string;
    password:string;
    role_id:number;
    role:string;
    img:string;
    createdAt:string;
    updatedAt:string;
}