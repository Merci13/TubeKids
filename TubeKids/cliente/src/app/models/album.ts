export class Album{// se define una clase y se exporta par aotros lados
    constructor(
       
        public title: string,
        public description: string,
        public year: number,
       
        public image: string,
        public artist: string
    ){ }
}