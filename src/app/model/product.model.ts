//product'ları apiden çekerken class içinde olması için : type güvenliği

export class Product{
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public imageUrl?: string,
        public description?: string
    ) {}
}


/*
optional : isteğe bağlı == name?  : burdaki soru işareti için.
*/