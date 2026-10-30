class Inregistrare {
  readonly moment: string;
  readonly text: string;

  constructor(moment: string, text: string) {
    this.moment = moment;
    this.text = text;
  }

  formateaza(): string {
    return `[${this.moment}] ${this.text}`;
  }
}

class InregistrareEroare extends Inregistrare {
  readonly cod: number;

  constructor(moment1: string, text2: string, cod3: number) {
    super(moment1, text2);
    this.cod = cod3;
  }

  formateaza(): string {
    return `${super.formateaza()} (cod ${this.cod})`;
  }
}

const info = new Inregistrare("10:00:01", "Suita a pornit");
const eroare = new InregistrareEroare("10:00:07", "Tabelul nu exista", 404);

console.log(info.formateaza());

