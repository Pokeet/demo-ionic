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
home.html
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
home.ts
...
export class HomePage {

    tasks = []

    constructor(
        public navCtrl: NavController
    ) {

    }

}
```

Il nous faut maintenant de quoi ajouter une tache à notre liste. On va utiliser un [FAB](https://ionicframework.com/docs/components/#fabs). 

```HTML
home.html
...
<ion-fab bottom right>
    <button ion-fab>
        <ion-icon name="add"></ion-icon>
    </button>
</ion-fab>
...
```

Bon c'est cool mais il sert à rien notre boutton. On va donc ajouter une directive ``(click)`` pour declancher une action au click. Puis on va ecrire la méthode dans le fichier home.ts sans quoi on aura droit a une belle erreur. 


```HTML
home.html
...
<ion-fab bottom right (click)="addTask()">
    <button ion-fab>
        <ion-icon name="add"></ion-icon>
    </button>
</ion-fab>
...
```

```TypeScript
home.ts
...
addTask () {
    console.log('hello')
}
...
```

Maintenant lorsque vous appuyez sur le boutton vous devriez voir 'hello' apparaitre dans votre terminal. C'est un début... C'est l'heure d'ouvrir un [modal](https://ionicframework.com/docs/components/#modals) et de créer une nouvelle page !

Un petit coup de ``ionic help`` nous apprend qu'il existe une commande generate qui permet de generer des pages, des directives, des composants ect ect... Essayons :

```
ionic generate page edit-task-modal
```

Hop, ionic nous génère tous les fichier qu'il faut pour créer une nouvelle page. Il faut ensuite déclarer cette nouvelle page dans src/app/app.module.ts.

```TypeScript
src/app/app.module.ts
...
import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'
import { EditTaskModalPage } from '../pages/edit-task-modal/edit-task-modal'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditTaskModalPage // on ajoute cette ligne
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditTaskModalPage // et cette ligne
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

On a plus qu'a l'afficher dans le modal [comme indiqué sur la doc](https://ionicframework.com/docs/components/#modals).

```TypeScript
home.ts
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { EditTaskModalPage } from '../edit-task-modal/edit-task-modal'
...

constructor (
    public navCtrl: NavController,
    public modalCtrl: ModalController // on injecte le modal controller
) {

}

addTask () {
    let modal = this.modalCtrl.create(EditTaskModalPage)
    modal.present()
}
```