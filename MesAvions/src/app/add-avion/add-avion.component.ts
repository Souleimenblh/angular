import { Component, OnInit } from '@angular/core';
import { Avion } from '../model/avion.model';
import { AvionService } from '../services/avion.service';
import { TypeAv } from '../model/TypeAv.model';
import { Router } from '@angular/router';
import { TypeAvWrapper } from '../model/TypeAvWrapped.model';

@Component({
  selector: 'app-add-avion',
  templateUrl: './add-avion.component.html',
})
export class AddAvionComponent implements OnInit {
  newAvion = new Avion();
  typesAv!: TypeAv[];
  newIdAv!: number;
  newType!: TypeAv;

  message: string = '';

  constructor(private avionService: AvionService, private router: Router) {}

  ngOnInit(): void {
    this.avionService.listeTypes().subscribe(
      typs => {
        console.log('Types data:', typs); // Add this line
        this.typesAv = typs._embedded.TypesAv;
      },
      (error) => {
        console.error('Error fetching types', error);
      }
    );
  }

  addAvion() {
    const selectedType = this.typesAv.find(type => type.idAv === this.newIdAv);
    this.avionService.ajouterAvion(this.newAvion).subscribe((avio) => {
      console.log(avio);
      this.router.navigate(['avions']);
    });
  }
}