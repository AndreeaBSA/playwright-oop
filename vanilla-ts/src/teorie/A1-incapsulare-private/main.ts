class NumaratorDeschis {
  verzi = 0;
  rosii = 0;

  inregistreaza(aTrecut: boolean): void {
    if (aTrecut) {
      this.verzi++;
    } else {
      this.rosii++;
    }
  }

  rezumat(): string {
    return `${this.verzi} verzi / ${this.rosii} rosii`;
  }
}

class NumaratorInchis {
  private verzi = 0;
  private rosii = 0;

  inregistreaza(aTrecut: boolean): void {
    if (aTrecut) {
      this.verzi++;
    } else {
      this.rosii++;
    }
  }

  total(): number {
    return this.verzi + this.rosii;
  }

  rezumat(): string {
    return `${this.verzi} verzi / ${this.rosii} rosii din ${this.total()}`;
  }
}

const deschis = new NumaratorDeschis();
deschis.inregistreaza(true);
deschis.inregistreaza(false);
deschis.verzi = 100;
console.log("deschis:", deschis.rezumat());

const inchis = new NumaratorInchis();
inchis.inregistreaza(true);
inchis.inregistreaza(true);
inchis.inregistreaza(false);
console.log("inchis: ", inchis.rezumat());
