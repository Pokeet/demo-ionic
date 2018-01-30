# Demo Ionic 3
Application simple avec [ionic 3](https://ionicframework.com/).

## Prérequis :bangbang:
1) Lire l'anglais (pour lire la doc)
1) savoir utiliser le terminal
2) des connaissances en JavaScript / TypeScript
1) nodejs installé 
2) npm installé
3) git installé
3) un accès sudo si vous etes sur une machine de type unix (mac / linux)
4) Avoir un compte sur le site de ionic [ici](https://dashboard.ionicjs.com/signup?source=framework-getting-started&kmid=LYhxNdjwJYsXWpb3MTV5VPGfsaw%3D). Lors de la création de votre compte, choisissez le plan gratuit "KickStarter"
5) Avoir l'application "IonicDev" installé sur son smartphone et se logger avec le compte ionic.

## Installation
Ionic est très simple d'utilisation et permet de débuter un nouveau projet très facilement. Pour commencez nous allons nous assurer d'avoir la dernière version LTS de node.js d'installée sur notre machine et la mettre à jour si ça n'est pas le cas. Pour cela je vous conseil d'utiliser le package "n".

```
sudo npm i -g n
```

puis

```
sudo n lts
```

Node est désormais à jour. On peut passer a l'installation de ionic. 

```
sudo npm i -g ionic
```

Voilà, on est prêt à commencer :ok_hand:.

## Boilerplate
Ionic est livré avec une commande qui facilite le démarrage d'un nouveau projet :

```
ionic start ma-super-application
``` 

Cette commande va lancer le générateur de projet qui vous demandera avec quel template vous souhaitez démarrer votre app. Dans notre cas nous allons choisir "blank". N'hésitez pas à explorer et triturer les autres template :wink:.

:watch: Attendez que ionic génère le projet, le temps d'attente est variable selon la vitesse de votre connexion.

Ionic vous demandera ensuite si vous souhaitez integrer cordova au projet pour empaqueter l'application pour ios et android. Si vous voulez faire une application pour Android ou iOs choisissez oui. Si vous souhaitez seulement faire une application pour le web choisissez non.

Ionic fini la génération du projet et installe les dépendances. C'est le moment de prendre un café :coffee:. Pendant l'installation ionic vous proposera d'installer l'application IonicDev sur votre smartphone. Mais vu que vous avez bien suivis le prérequis c'est déjà fait :+1:.

Bien, maintenant que tout est généré et installé ionic vous demande si vous souhaitez installer le sdk Ionic Pro. On n'en aura pas besoin pour cette demo. 

Le boilerplate est prêt :sunglasses: !

## Live reload
Ionic est un framework web frontend et utilise webpack pour générer l'application. Webpack quant à lui peut vérifier les sources du projet et regénérer l'application si celle-ci changes, et déclancher un rechargement de la page. Tout ceci nous permet de voir en temps réel les effets de ce que nous somme en train de coder directement sur l'application.

Testons cela sans plus attendre !

Placez vous dans le dossier du projet que ionic a généré :

```
cd ma-super-application
```

Puis lancez le serveur de test de ionic :

```
ionic serve -c
```

Cette commande va lancer un serveur web de test et la recompilation de l'application a chaque changement des sources. Votre navigateur favoris devrait s'ouvrir sur votre application de base. L'option -c permet de voir vos ``console.log('testazeaze')`` dans le terminal.

Vous pouvez également utiliser la commande 
```
ionic lab -c
``` 
qui ouvrira une page de test de l'application avec different format de mobile et os ainsi qu'une lsite des composants.

Bien, c'est le moment de lancer l'application IonicDev sur votre smartphone si vous voulez voir le rendu qu'aura votre application sur un mobile. Pour que ça fonctionne il faut que votre téléphone sois sur le meme réseau wifi que votre ordinateur. Si vous etes dans une salle de classe et que vous essayez tous en même temps, IonicDev vous proposera une liste de serveur de test disponible, il faudra choisir celui qui correspond à l'addresse ip de votre machine. Je rappelle, pour voir votre ip ``ipconfig`` sur windows et ``ifconfig`` sur mac / linux.

Bien, voilà, vous voyez votre app sur votre mobile maintenant. Essayer de changer le texte par defaut dans le fichier src/pages/home.html et sauvegardez. BIM ! L'app se recharge toute seul sur votre téléphone et vous voyez le changement. Pratique non ? Bien, maintenant on va pouvoir passer aux choses sérieuses :facepunch:...

## Une Todo list

On va faire dans le classique en créant une application de todo !

### Les composants

Ionic utilise le framework Angular qui nous permet de créer des composants web personalisé et de les intégrer dans notre application avec des balises html. Ionic est livré avec toute une suite de composants qu'on peut consulter [sur cette page](https://ionicframework.com/docs/components/).

Pour notre applications nous allons avoir besoin de 3 composants :
- Une liste pour afficher nos taches
- Un bouton pour ajouter une nouvelle tâche
- Un modal pour rentrer les information d'une tâche

#### La liste

C'est parti pour la liste. La documention nous indique que pour créer une liste il faut utiliser la balise ``ion-list`` comme suit :

```html
<ion-list>
    <button ion-item *ngFor="let item of items" (click)="itemSelected(item)">
        {{ item }}
    </button>
</ion-list>
```

Ca ne ressemble pas vraiment à du html classique... C'est parceque c'est un composant Angular. Un peu d'explications.

Angular permet de déclarer des "components", des balises personalisée aux-quelles on peut attacher un comportement a l'aide de javascript. Lorsque la page est rendue, angular va changer la balise par du code html classique et remplacer les valeurs entre crochets ( ici {{ item }} ) par les valeurs contenue dans les variable du meme non de notre script.

Nous avons donc notre composant liste qui contient un composant button. On remarque que ce composant button à plusieurs attributs avec des noms très différent de ce qu'on a l'habitude de voir en html. Ce sont des directives Angular. Elles renseigne angular sur la façon dont il doit rendre le composant. [Vous pouvez trouver la documentation sur les directive ici](https://angular.io/guide/displaying-data).

On apprend donc dans cette doc que le premier attribut ``ion-item`` est une [attribute directive](https://angular.io/guide/attribute-directives). 
Trop long ; Pas lu : Ce sont des objet qui permette de modifier l'apparence et le comportement d'un élément. Ici l'attribut permet de changer l'apparence du bouton dans la liste.

Arrive ensuite l'attribut ``*ngFor="let item of items"``. Cette directive permet de répéter l'élément pour chaque item du tableau items [comme l'explique la doc.](https://angular.io/guide/template-syntax#ngFor) Il existe de nombreuses directives du genre tel que ``*ngIf="foo == true"`` qui permet d'afficher ou cacher un élément si la condition est vrai ou fausse. [La doc de la syntax est ici](https://angular.io/guide/template-syntax).

Enfin nous avons l'attribut ``(click)="itemSelected(item)"``. Lorsqu'un attribut est entouré de parenthère, cela signifie qu'on ecoute un evennement. Ici click. Pourquoi ne pas simplement utiliser ``onclick`` alors ? Eh bien c'est parcequ'on utilise la variable item en parametre du listener, variable déclaré par le ``*ngFor`` et non accessible dans le context d'un simple ``onclick``.

Voilà, nous avons maintenant compris ce que signifiait tous ces attribut et balise, nous pouvons commencer à ajouter notre liste a notre ecran home.

Ouvrez le fichier src/pages/home.html et supprimez le code entre les balises ``ion-content``. Maintenant ajoutez le code suivant entre ces mêmes balises :

```html
//home.html
...
<ion-list>
    <button ion-item *ngFor="let task of tasks" (click)="toggleTask(task)">
        {{ task }}
    </button>
</ion-list>
...
```

Le code est très similaire a l'exemple de la doc... On créer autant de boutont qu'il y a d'élément dans le tableau tasks et on appelle la méthode ``toggleTask`` au click.

On sauvegarde et on regarde l'aperçu de la page... Rien. Et c'est normal, nous n'avons pas déclaré de tableau tasks dans notre javascript, il n'y a donc pas de task à afficher.

C'est donc le moment d'ouvrir le fichier src/pages/home.ts. Nous allons déclarer le tableau des taches "tasks" dans la classe HomePage, au dessus du constructor :

```TypeScript
//home.ts
...
export class HomePage {

    tasks = []

    constructor(
        public navCtrl: NavController
    ) {

    }

}
```
#### Le bouton
Il nous faut maintenant de quoi ajouter une tache à notre liste. On va utiliser un [FAB](https://ionicframework.com/docs/components/#fabs). 

```HTML
//home.html
...
<ion-fab bottom right>
    <button ion-fab>
        <ion-icon name="add"></ion-icon>
    </button>
</ion-fab>
...
```

Bon c'est cool mais il sert à rien notre bouton. On va donc ajouter une directive ``(click)`` pour declancher une action au click. Puis on va ecrire la méthode dans le fichier home.ts sans quoi on aura droit a une belle erreur. 


```HTML
//home.html
...
<ion-fab bottom right (click)="addTask()">
    <button ion-fab>
        <ion-icon name="add"></ion-icon>
    </button>
</ion-fab>
...
```

```TypeScript
//home.ts
...
addTask () {
    console.log('hello')
}
...
```

Maintenant lorsque vous appuyez sur le bouton vous devriez voir 'hello' apparaitre dans votre terminal. C'est un début... C'est l'heure d'ouvrir un [modal](https://ionicframework.com/docs/components/#modals) et de créer une nouvelle page !

Un petit coup de ``ionic help`` nous apprend qu'il existe une commande generate qui permet de generer des pages, des directives, des composants ect ect... Essayons :

```
ionic generate page edit-task-modal
```

Hop, ionic nous génère tous les fichier qu'il faut pour créer une nouvelle page ! 
On remarquera cependant qu'il existe un fichier suplémentaire par rapport à notre home page ; le fichier 'edit-task-modal.module.ts'.

Or c'est dans ce fichier qu'on va importer et déclarer les page et composant qu'on pourra utiliser dans notre page. Le fait que le dossier home n'en contienne pas est donc assez génant si on veut utiliser la page d'édition de tâche. On va donc créer ce fichier nous même. Ou plutôt, on va copier [l'exemple de la doc](https://ionicframework.com/docs/api/IonicModule/) dans un nouveau fichier nommé home.module.ts dans le dossier pages/home. Contrôlez bien quand même que la classe de votre home est bien HomePage, sinon adaptez le fichier en conséquence.

Bien, maintenant il faut changer le fichier src/app.module.ts car il n'utilise pas le fichier qu'on vien de créer mais importe directement la classe HomePage. Du coup on aura beau déclarer les composants et pages qu'on veut utiliser dans notre fichier, ça ne changera rien au resultat : une erreur à propos d'une élément non déclaré.

Donc, dans notre fichier src/app/app.module.ts, on supprime tout ce qui fait référence a HomePage. Puis on import le fichier src/pages/home/home.module et on déclare le module dans imports.

Votre fichier devrait ressembler à ceci : 
```TypeScript
//src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'

import { MyApp } from './app.component'
//import { HomePage } from '../pages/home/home' <==== on supprime cette ligne
import { HomePageModule } from '../pages/home/home.mofule' // on importe le module

@NgModule({
  declarations: [
    MyApp,
    //HomePage  <===== on supprime celle là aussi
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomePageModule // On déclare le module
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage <======= enfin on supprime celle ci
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```
Si vous sauvegardez, normalement, rien n'à changé. Ou presque. Maintenant ionic utilise le lazy loading et chargera en prioritée les premières pages et composants qui seront affichés en premier, au lieu de bloquer le démarrage de l'application jusqu'a ce que tout soit chargé, ce qui améliore grandement le temps de démarrage de l'application.

On a déclaré notre page dans app.module.ts. Maintenant il faut faire pareil avec notre page d'edition de tâche dans pages/home/home.module.ts pour pouvoir enfin l'utiliser.
Si vous suivez, votre fichier pages/home/home.module.ts devrait ressembler à ceci :

```TypeScript
//src/pages/home/home.module.ts

import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomePage } from './home'

import { EditTaskModalPageModule } from '../edit-task-modal/edit-task-modal.module' // on import le module du modal

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        EditTaskModalPageModule // on declare le module
    ],
    entryComponents: [
        HomePage
    ]
})
export class HomePageModule { }
```

Voilà, notre page est enfin prête à etre utilisée.

On a plus qu'a l'afficher dans le modal [comme indiqué sur la doc](https://ionicframework.com/docs/components/#modals). 

Pour le coup la doc est un peu en retard par rapport à ce guide.
En effet dans l'exemple de la doc on importe directement la classe de la page à afficher alors que nous, nous utilisons les modules et le lazy loading. Ce qui fait qu'au lieu d'importer la classe nous n'allons rien importer du tout puisqu'on s'est déjà chargé des déclarations et imports de modules dans le fichier home.module.ts. Enfin, au lieu de passer la classe EditTaskModalPage en paramètre de create(), nous allons passer une string 'EditTaskModalPage'. Ionic reconnaitra qu'il s'agit de la page.

On obtient donc dans notre fichier home.ts ceci :

```TypeScript
//home.ts
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  tasks = []

  constructor (
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    
  }

  addTask () {
    let modal = this.modalCtrl.create('EditTaskModalPage')
    modal.present()
  }

}

```

Maintenant quand on clique sur notre bouton +, notre nouvelle page s'affiche au-dessus, il n'y a plus qu'a modifier son contenu.

```HTML
<!--edit-task-modal.html-->
<ion-header>

  <ion-navbar>
    <ion-title>Editer la tâche</ion-title>
    <ion-buttons start>
      <button ion-button (click)="cancel()">
        <span ion-text color="primary" showWhen="ios">Annuler</span>
        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content padding>

  <ion-item>
    <ion-input type="text" value="" placeholder="Tenir la porte" [(ngModel)]="taskText"></ion-input>
  </ion-item>

  <button ion-item color="danger" (click)="cancel()">Annuler</button>
  <button ion-item color="primary" (click)="validate()" [disabled]="taskText == null || taskText == ''">Valider</button>

</ion-content>
```

Quelques nouveautées ici. Tout d'abord l'usage de la directive ``showWhen`` qui permet de ne montrer un element que sur certain os. Mais surtout l'usage de la directive ``[(ngModel)]`` qui permet de lier le contenu du champ de text a la variable taskText. Ainsi, si la valeur de taskText change, la valeur de la variable changera, et inversement. Enfin, il y a la directive ``[disabled]`` du bouton Valider qui permet de desactiver un bouton seulement si la condition est remplie.

Passons maintenant au script du modal :
```TypeScript
//edit-task-modal.ts
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular'; // On oublie pas d'importer ViewConroller
...
export class EditTaskModalPage {

  taskText : any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController // on injecte le view controller
  ) {
  }

  cancel () {
    this.viewCtrl.dismiss() // On ferme le modal sans renvoyer de parametre
  }

  validate () {
    this.viewCtrl.dismiss(this.taskText) // On ferme le modal en renvoyant en parametre la valeur de taskText.
  }

}
```

Enfin on modifie la fonction addTask() de home.ts

```TypeScript
//home.ts
addTask () {
    let modal = this.modalCtrl.create(EditTaskModalPage)

    // Lorsqu'on ferme le modal on vérifie si des donnée on été renvoyé. Si oui, on ajoute la tâche.
    modal.onDidDismiss(data => { 
        if (data != null && data != '') {
            this.tasks.push(data)
        }
    })

    modal.present()
}
```

Voilà, on peut maintenant ajouter une tâche. 

Maintenant, débrouillez-vous pour que lorsqu'on clique sur une tâche elle sois supprimé de la liste. 

