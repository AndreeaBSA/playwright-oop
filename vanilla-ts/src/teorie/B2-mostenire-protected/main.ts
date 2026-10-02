class ListaDeRanduri {
  protected randuri: string[] = [];

  adauga(rand: string): void {
    this.randuri.push(rand);
  }

  numar(): number {
    return this.randuri.length;
  }
}

class ListaFaraDuplicate extends ListaDeRanduri {
  adauga(rand: string): void {
    if (this.randuri.includes(rand)) {
      return;
    }
    super.adauga(rand);
  }
}

const cuDuplicate = new ListaDeRanduri();
cuDuplicate.adauga("ESID-100");
cuDuplicate.adauga("ESID-100");
cuDuplicate.adauga("ESID-777");
console.log("ListaDeRanduri:   ", cuDuplicate.numar());

const faraDuplicate = new ListaFaraDuplicate();
faraDuplicate.adauga("ESID-100");
faraDuplicate.adauga("ESID-100");
faraDuplicate.adauga("ESID-777");
console.log("ListaFaraDuplicate:", faraDuplicate.numar());
