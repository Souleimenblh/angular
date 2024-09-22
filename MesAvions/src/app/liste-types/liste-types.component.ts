import { Component, OnInit } from '@angular/core';
import { TypeAv } from '../model/TypeAv.model';
import { AvionService } from '../services/avion.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: [],
})
export class ListeTypesComponent implements OnInit {
  types!: TypeAv[];
  ajout: boolean = true;

  updatedTyp: TypeAv = { idAv: 0, matriculeAv: '' };

  constructor(private avionService: AvionService,public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.avionService.listeTypes().subscribe((typs) => {
      this.types = typs._embedded.types;
      console.log(typs);
    });
  }

  typeUpdated(typ: TypeAv) {
    console.log('Type updated event', typ);
    this.avionService.ajouterTypeAv(typ).subscribe(() => this.chargerTypes());
  }

  updateTyp(typ: TypeAv) {
    this.updatedTyp = typ;
    this.ajout = false;
  }
}
