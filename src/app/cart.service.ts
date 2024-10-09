// Importation du service HttpClient depuis le module Angular commun (common) pour effectuer des requêtes HTTP
import { HttpClient } from '@angular/common/http';

// Importation du décorateur @Injectable qui permet à Angular d'injecter ce service dans d'autres composants ou services
import { Injectable } from '@angular/core';

// Importation de l'interface Product définie dans un autre fichier (products.ts).
// Cette interface représente les produits que l'on manipule dans le panier.
import { Product } from './products';

@Injectable({
  providedIn: 'root', // Ce service est fourni au niveau de la racine de l'application, il est donc accessible partout sans avoir besoin de l'ajouter à un module spécifique.
})
export class CartService {
  // Déclaration d'une propriété 'items' qui est un tableau de produits.
  // Il représente le contenu actuel du panier d'achat.
  items: Product[] = [];

  // Constructeur de la classe CartService, où le service HttpClient est injecté.
  // L'injection permet à Angular de fournir une instance de HttpClient à ce service automatiquement.
  // Cela permettra à CartService d'effectuer des requêtes HTTP pour interagir avec des API ou récupérer des données externes.
  constructor(private http: HttpClient) {}

  // Méthode pour ajouter un produit au panier.
  // Elle prend en paramètre un objet 'product' de type Product et l'ajoute au tableau 'items' via la méthode 'push()'.
  addToCart(product: Product) {
    this.items.push(product);
  }

  // Méthode pour récupérer tous les articles du panier.
  // Elle renvoie simplement la liste des articles stockés dans 'items'.
  getItems() {
    return this.items;
  }

  // Méthode pour vider le panier.
  // Elle réinitialise 'items' en le mettant à un tableau vide et retourne ce tableau (qui sera vide après cette opération).
  clearCart() {
    this.items = [];
    return this.items;
  }

  // Méthode pour récupérer les prix d'expédition depuis un fichier JSON externe situé dans le répertoire '/assets'.
  // Elle utilise HttpClient pour effectuer une requête HTTP GET vers le fichier 'shipping.json'.
  // Le type de données retourné par cette requête est spécifié comme un tableau d'objets, où chaque objet a un type (string) et un prix (number).
  getShippingPrices() {
    // Appel de la méthode 'get()' de HttpClient pour effectuer une requête GET.
    // La requête renvoie un Observable contenant un tableau d'objets avec des propriétés 'type' (de type string) et 'price' (de type number).
    return this.http.get<{ type: string; price: number }[]>(
      // Chemin vers le fichier JSON contenant les données de livraison.
      '/assets/shipping.json'
    );
  }
}
