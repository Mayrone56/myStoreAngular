// Importation des modules nécessaires depuis Angular et RxJS
import { Component, OnInit } from '@angular/core'; // Importation des outils de base d'Angular pour créer un composant et le cycle de vie OnInit
import { Observable } from 'rxjs'; // Importation de la classe Observable pour gérer les flux de données asynchrones
import { CartService } from '../cart.service'; // Importation du service CartService, qui contient la logique liée au panier et aux coûts d'expédition

// Déclaration du composant ShippingComponent, avec son sélecteur, son template et ses styles
@Component({
  selector: 'app-shipping', // Le sélecteur utilisé dans le template HTML pour inclure ce composant, comme <app-shipping></app-shipping>
  templateUrl: './shipping.component.html', // Chemin vers le fichier template HTML pour ce composant
  styleUrls: ['./shipping.component.scss'], // Chemin vers le fichier de styles spécifiques à ce composant
})

// La classe ShippingComponent implémente l'interface OnInit pour gérer le cycle de vie du composant
export class ShippingComponent implements OnInit {
  // Injection du service CartService dans le constructeur du composant ShippingComponent
  constructor(private cartService: CartService) {}

  // Déclaration de la propriété shippingCosts, qui est un Observable contenant un tableau d'objets avec deux propriétés : type (string) et price (number)
  // "Observable" est une classe de RxJS qui permet de gérer des flux de données asynchrones. Le "!" indique que cette propriété sera initialisée plus tard (lors de ngOnInit).
  shippingCosts!: Observable<{ type: string; price: number }[]>;

  // La méthode ngOnInit est appelée par Angular après l'initialisation du composant. C'est ici qu'on configure des paramètres ou on récupère des données, comme les coûts d'expédition dans cet exemple.
  ngOnInit() {
    // Utilisation du service CartService pour récupérer les coûts d'expédition à l'aide de la méthode getShippingPrices()
    // Cette méthode retourne un Observable, auquel on affecte la propriété shippingCosts
    this.shippingCosts = this.cartService.getShippingPrices();
  }
}
