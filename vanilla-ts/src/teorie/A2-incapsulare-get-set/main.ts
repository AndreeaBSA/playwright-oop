class Procent {
  readonly nume: string;
  private _valoare = 0;

  constructor(nume: string) {
    this.nume = nume;
  }

  get valoare(): number {
    return this._valoare;
  }

  set valoare(noua: number) {
    if (noua < 0) {
      this._valoare = 0;
    } else if (noua > 100) {
      this._valoare = 100;
    } else {
      this._valoare = noua;
    }
  }

  get afisare(): string {
    return `${this.nume}: ${this._valoare}%`;
  }
}

const acoperire = new Procent("Acoperire");
acoperire.valoare = 87.5;
console.log(acoperire.afisare);

acoperire.valoare = 140;
console.log(acoperire.afisare);

acoperire.valoare = -3;
console.log(acoperire.afisare);

console.log("valoarea citita:", acoperire.valoare);
