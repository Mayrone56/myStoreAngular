import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Pour accéder aux paramètres de la route

import { Product, products } from '../products'; // Un modèle ou une interface pour définir la structure d'un produit
import { CartService } from '../cart.service'; // Un service qui récupère les détails du produit

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined; // Propriété où le produit sera stocké, que l'on retrouve dans le template par exemple dans <div *ngIf="product">

  constructor(
    private route: ActivatedRoute, // Pour obtenir l'ID du produit depuis l'URL
    private cartService: CartService // Service pour récupérer les données du produit
  ) {
    //Ce code exécute du code de configuration lors de l'initialisation de la classe, ici en affichant simplement un message dans la console.
    console.log('Hello');
  }

  ngOnInit() {
    // First get the product id from the current route.
    // Récupére l'ID du produit dans l'URL
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    // Find the product that correspond with the id provided in route.
    this.product = products.find(
      (product) => product.id === productIdFromRoute
    );
  }
  // Ajout du produit au panier
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
