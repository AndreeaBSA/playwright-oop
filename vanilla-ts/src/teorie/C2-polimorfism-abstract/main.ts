abstract class Notificare {      // cuvantul cheie abstract =>  clasa nu poate fi instantiata (nu putem folosi new )
                                                         // =>   clasa poate contine atat metode abstracte cat si metode concrete                           
  readonly destinatar: string;

  constructor(destinatar: string) {
    this.destinatar = destinatar;
  }

  abstract corp(): string;  // cuvantul abstract in context reprezinta o metoda abstracta

  trimite(): string {
    return `Catre ${this.destinatar}: ${this.corp()}`;
  }
}

class NotificareSucces extends Notificare { // cuvantul cheie extends   implica mostenirea lui Notiifcare iar pentru ca Notificare este o clasa abstracta automat  NotificareSucces este obligata sa aibe metoda corp
  corp(): string {
    return "toate testele au trecut";
  }
}

class NotificareEsec extends Notificare {
  readonly cateRosii: number;

  constructor(destinatar: string, cateRosii: number) {
    super(destinatar);
    this.cateRosii = cateRosii;
  }

  corp(): string {
    return `${this.cateRosii} teste rosii`;
  }
}

const notificari: Notificare[] = [  
  new NotificareSucces("andreea"),
  new NotificareEsec("bogdan", 5),
];

for (const n of notificari) {
  console.log(n.trimite());
}
