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

  constructor(moment: string, text: string, cod: number) {
    super(moment, text);
    this.cod = cod;
  }

  formateaza(): string {
    return `${super.formateaza()} (cod ${this.cod})`;
  }
}

const info = new Inregistrare("10:00:01", "Suita a pornit");
const eroare = new InregistrareEroare("10:00:07", "Tabelul nu exista", 404);

console.log(info.formateaza());
console.log(eroare.formateaza());
console.log("eroarea are moment:", eroare.moment);
console.log("eroarea e si Inregistrare:", eroare instanceof Inregistrare);
