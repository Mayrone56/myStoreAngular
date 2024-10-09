// Importation des modules nécessaires depuis Angular
import { Component } from '@angular/core'; // Importation de la classe Component pour créer des composants Angular
import { FormBuilder } from '@angular/forms'; // Importation de FormBuilder pour faciliter la création de formulaires réactifs

// Importation du service CartService pour gérer le panier d'achats
import { CartService } from '../cart.service';

// Décorateur Component qui définit les métadonnées du composant
@Component({
  selector: 'app-cart', // Sélecteur qui sera utilisé dans le template HTML pour intégrer ce composant
  templateUrl: './cart.component.html', // Chemin vers le template HTML associé
  styleUrls: ['./cart.component.scss'], // Chemin vers le fichier CSS pour le style du composant
})

// Déclaration de la classe CartComponent qui contient la logique de ce composant
export class CartComponent {
  // Propriété pour stocker les éléments du panier, initialisée en appelant le service cartService
  items = this.cartService.getItems();

  // Création d'un formulaire réactif avec deux champs : nom et adresse
  checkoutForm = this.formBuilder.group({
    name: '', // Champ pour le nom, initialisé à une chaîne vide
    address: '', // Champ pour l'adresse, initialisé à une chaîne vide
  });

  // Constructeur de la classe CartComponent
  constructor(
    // Injection du service CartService pour pouvoir accéder aux méthodes de ce service
    private cartService: CartService,
    // Injection de FormBuilder pour créer le formulaire réactif
    private formBuilder: FormBuilder
  ) {}

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    // Traitement des données du formulaire lors du passage à la caisse
    this.items = this.cartService.clearCart(); // Appelle la méthode clearCart() du service pour vider le panier et met à jour la liste des articles
    window.alert('Your order has been submitted');
    console.warn('Your order has been submitted', this.checkoutForm.value); // Affiche un message dans la console avec les données du formulaire
    this.checkoutForm.reset(); // Réinitialise le formulaire après la soumission
  }

  getTotalPrice() {
    const initialValue = 0;
    return this.items.reduce((total, item) => total + item.price, initialValue);
  }
}
