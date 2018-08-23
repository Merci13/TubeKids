export class User{// se define una clase y se exporta par aotros lados
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ){ }
}