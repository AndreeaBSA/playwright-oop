class Coloana {
  readonly nume: string;

  constructor(nume: string) {
    this.nume = nume;
  }

  afiseaza(valoare: string): string {
    return valoare;
  }
}

class ColoanaData extends Coloana {
  afiseaza(valoare: string): string {
    return valoare.split("-").reverse().join(".");
  }
}

class ColoanaSuma extends Coloana {
  afiseaza(valoare: string): string {
    return `${Number(valoare).toFixed(2)} RON`;
  }
}

const coloane: Coloana[] = [
  new Coloana("ESID"),
  new ColoanaData("CREATED_ON"),
  new ColoanaSuma("AMOUNT"),
  new Coloana("STATUS"),
];

const rand = ["ESID-100", "2026-10-02", "1234.5", "Active"];

for (let i = 0; i < coloane.length; i++) {
  console.log(`${coloane[i].nume.padEnd(11)} ${coloane[i].afiseaza(rand[i])}`);
}
