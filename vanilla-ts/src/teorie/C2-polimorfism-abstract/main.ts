abstract class Notificare {
  readonly destinatar: string;

  constructor(destinatar: string) {
    this.destinatar = destinatar;
  }

  abstract corp(): string;

  trimite(): string {
    return `Catre ${this.destinatar}: ${this.corp()}`;
  }
}

class NotificareSucces extends Notificare {
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
