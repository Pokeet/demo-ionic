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
Ionic est un framework web frontend et utilise webpack pour générer l'application. Webpack quant à lui peut vérifier les sources du projet et regénérer l'application si celle-ci changes, et déclencher un rechargement de la page. Tout ceci nous permet de voir en temps réel les effets de ce que nous somme en train de coder directement sur l'application.

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

#### Le Modal

Un petit coup de ``ionic help`` nous apprend qu'il existe une commande generate qui permet de generer des pages, des directives, des composants ect ect... Essayons :

```
ionic generate page edit-task-modal
```

Hop, ionic nous génère tous les fichier qu'il faut pour créer une nouvelle page ! 
On remarquera cependant qu'il existe un fichier suplémentaire par rapport à notre home page ; le fichier 'edit-task-modal.module.ts'.

Or c'est dans ce fichier qu'on va importer et déclarer les pages et composants qu'on pourra utiliser dans notre page. Le fait que le dossier home n'en contienne pas est donc assez génant si on veut utiliser la page d'édition de tâche. On va donc créer ce fichier nous même. Ou plutôt, on va copier [l'exemple de la doc](https://ionicframework.com/docs/api/IonicModule/) dans un nouveau fichier nommé home.module.ts dans le dossier pages/home. Contrôlez bien quand même que la classe de votre home est bien HomePage, sinon adaptez le fichier en conséquence.

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

#### Petit exo 

Maintenant, débrouillez-vous pour que lorsqu'on clique sur une tâche elle sois supprimé de la liste. 

<details>
    <summary>Solution. Ne cliquez pas sans avoir essayé.</summary>
    Bien, pour supprimer une tâche quand on clique dessus, il faut tout d'abord créer une méthode dans le fichier home.ts. Appellons la deleteTask. Cette méthode dois prendre en paramètre la tâche à supprimer et la retirer du tableau tasks.
    On obtient donc ceci : 
    <code><pre>
    //home.ts
    ...
    deleteTask (task) {
        this.tasks.remove(task);
    }
    </pre></code>
    Ensuite dans home.html, on ajoute un appel a cette méthode sur le click de l'item de la listcomme ceci :

    <button ion-item *ngFor="let task of tasks" (click)="deleteTask()">
</details>

## Création d'un composant maison

### Configuration

On arrive à créer et ajouter une tâche. Maintenant on aimerait bien rendre notre item un peu plus complexe et améliorer l'expérience utilisateur. 
On pourrait écrire le comportement de l'item dans home.ts et le template dans home.html mais c'est ni très propre, ni réutilisable.

On va donc créer un composant.

Pour cela on va utiliser le générateur de ionic à nouveau :
```shell
ionic g component todo-item
```

Un nouveau dossier nommé "components" est créé. Dans ce dossier deux éléments : le dossier todo-item qui contient le code de notre nouveau composant et le fichier components.module.ts. On va supprimer ce dernier car il permet de charger tous nos composants d'un coup, or nous on utilise le lazy loading pour charger les composants seulement quand on en a besoin.

Dans le dossier todo-item on va créer un nouveau fichier "todo-item.module.ts" qui va nous permettre d'importer notre composant. Le contenu de ce fichier dois être le suivant : 

```TypeScript
//todo-item.module.ts
import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { TodoItemComponent } from './todo-item'

@NgModule({
    declarations: [
        TodoItemComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        TodoItemComponent
    ]
})
export class TodoItemComponentModule {}
```

Maintenant on va ouvrir notre fichier todo-item.html pour voir le template.
```html
<!--todo-item.html-->
<div>
    {{ text }}
</div>
```
Maintenant si vous ouvrez le fichier todo-item.ts vous verrez que "hello-world" est assigné a la variable text. 

Bref, ça fonctionne exactement comme une page tout ça. En fait, les pages sont des composants angular.

On va changer un peu le template par ceci :
```html
<!--todo-item.html-->
<button ion-item>
    <ng-content></ng-content>
</button>
```

Le composent ng-content va afficher le contenu qui se trouvera entre les deux balise de votre composant.

Puis dans home.html on va remplacer le boutton de notre liste par notre nouveau composant.

```html
<!--home.html-->
....
<todo-item *ngFor="let task of tasks" (click)="deleteTask(task)">
    {{ task }}
</todo-item>
```

Bim, erreur. todo-item n'est pas un élément connu... C'est parcequ'on l'a pas encore importé !

On va donc dans home.module.ts pour ajouter notre composant dans la liste des module a importer, comme on l'a fait avant pour la page d'edition de tâche.
```TypeScript
//home.module.ts
...
import { TodoItemComponentModule } from '../../components/todo-item/todo-item.module'
...
    imports: [
        IonicPageModule.forChild(HomePage),
        EditTaskModalPageModule,
        TodoItemComponentModule
    ],
```

Voilà. Maintenant il faut rédémarrer le ionic lab parceque l'aperçu en temps reel bug un peu lorsqu'on ajoute de nouveau module et risque de vous signaler des erreurs qui n'existes pas. 

Et donc, par rapport à avant, ça n'a pas changé grand chose... Mais au moins on a créer notre propre composant qu'on va pouvoir customiser dès maintenant.

### Edition du template et du comportement

Pour commencer, plutôt que supprimer la tâche quand on clique dessus, on voudrait la barrer. On peut donc déjà supprimer le listener sur le click qui delete la tache pour obenir ceci : 

```html
<!--home.html-->
....
<todo-item *ngFor="let task of tasks">
    {{ task }}
</todo-item>
```

Ensuite, on va créer un champ dans la class de TodoItemComponent pour stocker si la tâche est complétée ou non.

```TypeScript
//todo-item.ts
...
export class TodoItemComponent {
    complete: boolean

    constructor () {
        this.complete = false
    }
...
```

On va aussi ajouter une méthode qu'on appelera au click pour inverser l'état de completion de la tâche :

```TypeScript
//todo-item.ts
...
    toggleCompletion () {
        this.complete = !this.complete
    }
...
```

On va maintenant déclencher cette fonction au click de notre item :

```html
<button ion-item (click)="toggleCompletion()" [ngClass]="{'done':complete}">
    {{ task }}
</button>
```

Notez la directive [ngClass]="{'done':complete}". Cette directive nous permet d'ajouter des classes css ou non en fonction d'une condition (ici le boolean complete). On peut en ajouter plusieur en les séparant par des vrgules comme ceci : {'classA': true, 'classB': conditionA || conditionB} ....

Il ne nous reste plus qu'a écrire cette class css dans le fichier de style todo-item.scss :

```scss
//todo-item.scss
todo-item {
    .done {
        text-decoration: line-through;
        background-color: color($colors, secondary, base);
    }
}
```

Et voilà, maintenant, si on clique sur  la tâche, celle-ci sera rayé et le fond changera de couleur.

Le soucis c'est que maintenant on ne peut plus supprimer la tâche de notre liste. Seulement la rayer. Et ça serait bien aussi de pouvoir l'éditer. On va ajouter deux boutons pour ces actions.

Plutôt que mettre les boutons directement sur la tâche et perdre un peu d'espace pour le texte, on va les cacher et les faire apparaitre seulement lorsqu'on swipera la tâche à gauche ou à droite.

Il y a un composant tout fait pour ça, la [sliding list](https://ionicframework.com/docs/components/#sliding-list).

On edite donc le template de notre composant afin d'obtenir ceci :

```html
<!--todo-item.html-->
<ion-item-sliding>
  <button ion-item (click)="toggleCompletion()" [ngClass]="{'done':complete}">
    <ng-content></ng-content>
  </button>
  <ion-item-options side="left">
    <button ion-button color="danger">
      <ion-icon name="trash"></ion-icon>
      Supprimer
    </button>
  </ion-item-options>
  <ion-item-options side="right">
    <button ion-button color="secondary">
      <ion-icon name="create"></ion-icon>
      Modifier
    </button>
  </ion-item-options>
</ion-item-sliding>
```

Voilà, on a nos deux boutons à gauche et à drite de notre tâche selon la direction dans laquelle on swipe. On va maintenant brancher des évennements sur ces boutons pour modifier ou supprimer la tâches. Comme d'habitude, on fait ça avec une directive d'evenement : des parenthèses autour de l'event à binder :

```html
<!--todo-item.html-->
<ion-item-sliding>
  <button ion-item (click)="toggleCompletion()" [ngClass]="{'done':complete}">
    {{ task }}
  </button>
  <ion-item-options side="left">
    <button ion-button color="danger" (click)="onClickDelete()"> <!-- onClickDelete, la fonction du fichier todo-item.ts qui sera appellé quand on cliquera sur la poubelle -->
      <ion-icon name="trash"></ion-icon>
      Supprimer
    </button>
  </ion-item-options>
  <ion-item-options side="right">
    <button ion-button color="secondary" (click)="onClickEdit()"> <!-- Même principe -->
      <ion-icon name="create"></ion-icon>
      Modifier
    </button>
  </ion-item-options>
</ion-item-sliding>
```

On ajoute maintenant ces deux méthodes dans notre fichier todo-item.ts :

```TypeScript
// todo-item.ts
...
  toggleCompletion () {
    this.complete = !this.complete
  }

  onClickDelete () {
  }

  onClickEdit () {
  }
```

Bien. Et maintenant ? Maintenant, on est bloqué. 

En effet on n'a aucun moyen de modifier la liste des tâches depuis notre composant puisqu'on à aucune référence vers celle-ci pour la manipuler. Et puis même si on en avait une, ca ne serait pas une pratique très propre et en accord avec le design pattern des observateurs qu'Angular applique.

Alors comment faire ? 

On va signaler au composant qui contient notre composant, son parent, qu'un de nos boutons a été cliqué. C'est le parent qui décidera quoi faire de cette information.

## Les Events

Les events sont des signaux qu'on va envoyer à tous les composant qui les écoutes. Vous vous souvenez des directives (click)="action()" qu'on à utilisé avant pour réagir au click d'un bouton ? Et bien c'est ça un event, et on va apprendre à déclarer les notres.

### Déclarer un event

Pour déclarer un event dans notre composant, il faut instancier un émetteur d'event dans une variable précédée du décorateur "@Output()". Ce qui donne : 

```TypeScript
@Output() monEvent = new EventEmitter<string>()
```

Pour notre composant on va donc déclarer deux émetteurs : un pour la suppression et un pour l'édition.

```TypeScript
// todo-item.ts
...
export class TodoItemComponent {

  @Output() onEdit = new EventEmitter<string>() //  nos deux
  @Output() onDelete = new EventEmitter<string>() // event emitter 

  complete: boolean

  constructor () {
    this.complete = false
  }
...
```

Une fois nos émetteur déclarés, on a plus qu'a les utiliser pour émettres les events vers le parent : 

```TypeScript
// todo-item.ts
...
  onClickDelete () {
    this.onDelete.emit()
  }

  onClickEdit () {
    this.onEdit.emit()
  }
...
```

Nos events seront maintenant émis quand on cliquera sur les boutons. Il ne reste plus qu'a les intercepter dans notre page et agir en fonction du signal reçu.

Retour au fichier home.html donc :

```html
<!--home.html -->
...
<ion-list>
    <todo-item *ngFor="let task of tasks" [task]="task" (onDelete)="deleteTask(task)" (onEdit)="editTask(task)"></todo-item>
    <!-- On a ajouté les deux directives (onDelete)="deleteTask(task)" et (onEdit)="editTask(task) -->
  </ion-list>
...
```

On a déjà la méthode deleteTask de déclarée dans notre fichier home.ts et la méthode addTask. On va renommer cette méthode en editTask (penser à renommer la fonction appellé dans le bouton d'ajout de tâche aussi) et la modifier pour qu'elle prenne en parametre une tache. 

De cette façon on pourra ouvrir le meme modal en mode "ajout" ou "edition" de tache en lui passant en parametre d'ouverture une tache ou non.

```TypeScript
// home.ts
editTask (task) {
    let navParams = null // navParams est l'objet qu'on va envoyer en parametre au modal
    let taskId = -1
    if (task != null) {
        navParams = {
            task // on ajoute la tâche dans notre objet de parametrage du modal
        }
        taskId = this.tasks.indexOf(task) // on recupère l'index de la tâche dans le tableau de tâche pour pouvoir la mettre à jour avec la réponse du modal quand on le fermera
    }
    let modal = this.modalCtrl.create('EditTaskModalPage', navParams) // on ouvre le modal avec notre objet en second parametre.

    modal.onDidDismiss(data => {
        if (data != null && data != '' && taskId == -1) { // si taskId est == a -1 c'est qu'on a pas passé de tache en paramettre de la fonction et donc qu'il s'agit d'une nouvelle tâche. On l'ajoute a la liste.
            this.tasks.push(data)
        } else { // en revanche si on a une taskId > -1 c'est qu'on a passé une tache en paramètre, on remplace donc l'index corespondant dans la lsite
            this.tasks[taskId] = data
        }
    })

    modal.present()
}
```

Enfin on corrige le fichier edit-task-modal.ts pour qu'il prenne en compte ce paramètre à l'ouverture :

```TypeScript
// edit-task-modal.ts
import { Component } from '@angular/core';

// On importe NavParams, c'est la classe qui va nous permettre de lire les parameètre d'ouverture
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-task-modal',
  templateUrl: 'edit-task-modal.html',
})
export class EditTaskModalPage {

  taskText : any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, // On injecte le NavParams pour pouvoir l'utiliser
    public viewCtrl: ViewController
  ) {
    let text = this.navParams.get('task') // On récupère le texte de la tâche envoyé en parametre
    if (text != null) { 
      this.taskText = text // on remplace le texte vide par celui de la tâche envoyée en paramètre
    }
  }

  cancel () {
    this.viewCtrl.dismiss()
  }

  validate () {
    this.viewCtrl.dismiss(this.taskText)
  }

}
```

Et voilà, c'est tout. 
Maintenant on peut supprimer et éditer un tâche.


## Gestion et Conservation des données
### Providers
Les fonctions de base de notre application sont en place. On peut ajouter, supprimer et éditer une tâche. L'ennui c'est qu'en quittant l'application nous perdons toutes nos données. De plus toute nos données sont gérées par la page de la liste des tâches, ce qui n'est pas très pratique si on veut pouvoir accéder ou modifier ces données depuis une autre page par exemple. On va donc aborder une nouveau concept : Les providers.

Les providers sont des classes qui vont nous permettre de gérer les données de notre app et d'y acceder depuis n'importe quelle page ou composant.

```
ionic g provider TasksProvider
```

Cette commande va générer le dossier "providers" et "tasks" dans lequel on trouvera le fichier tasks.ts.
On notera que la commande mettra également a jour le fichier app.module.ts afin qui nous puissiont injecter et utiliser notre provider dans nos pages sans faire les modification du app.module.ts manuellement. Normalement il faut importer le provider dans ce fichier et l'ajouter a la liste des providers dans l'objet de configuration ngModules.

Dans providers/tasks/tasks.ts, commentez les ligne relatives a httpclient, on ne vas pas l'utiliser pour l'instant (un import et dans le constructeur)

Bien, maintenant on peut importer notre provider dans notre home.ts.

Ajoutez simplement cette ligne à la liste des imports : 
```TypeScript
// home.ts
import { TasksProvider } from '../../providers/tasks/tasks'
```

Ensuite dans le constructeur de la page home on inject le provider :

```TypeScript
constructor (
  public navCtrl: NavController,
  public modalCtrl: ModalController,
  public tasksProvider : TasksProvider // la ligne a ajouter
)
```

On peut maintenant utiliser notre provider. Mais pour le moment il ne fait pas grand chose.
Passons donc sur le fichier providers/tasks/tasks.ts.

On comment par déclarer une liste pour stocker les tâches comme on l'a déjà fait dans home.ts :

```TypeScript
// providers/tasks/tasks.ts
@Injectable()
export class TasksProvider {

  tasks : Array<string> // on déclare la liste des tâches

  constructor (
    // ...
```

On va maintenant écrire les méthodes qui vont nous permettre de manipuler nos tâches : récupération des tâches, ajout, recherche, edition et suppression. Se sont quasiment les même méthodes que ce que nous avons déjà écris dans home.ts mais cette fois nous ne nous soucierons pas de l'affichage.

On obtient donc les méthodes suivante :

```TypeScript
// providers/tasks/tasks.ts
  getTasks () { // pour le moment on renvois seulement un tableau prédéfinis
    this.tasks = [
      "Hodor !",
      "HOODOOOOOOOOR !!",
      "Hodor ?"
    ]
  }

  addTask (task : string) { // ajout d'une task a la fin de la liste
    this.tasks.push(task)
  }

  editTask (id, task : string) { // editer une tasks a partir de sa position dans le tabelau et le nouveau texte
    if (task != "" && task != null) {
      this.tasks[id] = task
    }
  }

  findTask (text : string) { // trouver la position d'une task dans la liste
    return this.tasks.indexOf(text)
  }

  deleteTask (task : string) { // efacer une task
    let index = this.findTask(task)
    if (index > -1) {
      this.tasks.splice(index, 1)
    }
  }
```

Voilà, maintenant on peut remplacer notre liste de tache de home.ts par notre provider.

Dans le constructeur on demande au provider de récupérer la liste des tâches :

```TypeScript
// home.ts
  constructor (
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public tasksProvider : TasksProvider
  ) {
    this.tasksProvider.getTasks();
  }
```

Ensuite, partout ou il y'a ```this.tasks``` on va remplacer par la méthode de notre provider qui correspond.
editTask() et deleteTask() resemble donc désormais à ceci : 

```TypeScript
// home.ts
  editTask (task) {
    let navParams = null
    let taskId = -1
    if (task != null) {
      navParams = {
        task
      }
      taskId = this.tasksProvider.findTask(task)
    }
    let modal = this.modalCtrl.create('EditTaskModalPage', navParams)

    modal.onDidDismiss(data => {
      if (data != null && data != '' && taskId == -1) {
        this.tasksProvider.addTask(data)
      } else {
        this.tasksProvider.editTask(taskId, data)
      }
    })

    modal.present()
  }

  deleteTask (task) {
    this.tasksProvider.deleteTask(task)
  }
```

Il faut également penser à mettre à jour le template de la page. En effet, celui-ci fait encore référence au champs tasks de home.ts que nous avons supprimé. Maintenant il faut faire référence à la liste du provider. C'est simple a changer ; dans notre todo-item on va dire de chercher le tableau tasks dans l'objet tasksProvider.tasks au lieu de simple tasks : 

```html
  <todo-item *ngFor="let task of tasksProvider.tasks" (onDelete)="deleteTask(task)" (onEdit)="editTask(task)">
    {{ task }}
  </todo-item>
```

Et voilà, ca fonctionne comme avant... 

Mais maintenant notre code est plus propre avec un rôle par fichier :
 - Dans le fichier tasks.ts on s'occupera seulement de manipuler les données de notre liste. C'est le model. 
 - Dans le fichier home.html on ne s'occupera que de la façon dont doivent être affché les données, c'est la vue.
 - Dans le fichier home.ts on manipulera le model et al vue en fonction des action de l'utilisateur, c'est le controlleur.

On travail donc ici avec le design patern MVC.

On va maintenant rendre notre model un peu plus interressant en faisant en sorte que chacunes de nos modification de celui-ci soient sauvegardées entre les utilisations.

## stocker les infos

Pour stocker les informations nous allons installer le plugin storage de ionic comme indiqué dans la doc ici : 
https://ionicframework.com/docs/storage/

Nous importons ensuite le module Storage dans notre provider :
```TypeScript
// tasks.ts
import { Storage } from '@ionic/storage'
```

Puis on inject storage dans le constructeur de notre provider : 
```TypeScript
// tasks.ts
  constructor (
    private storage : Storage
  ) {
    
  }
```

Mainenant on va changer la méthode getTasks pour qu'elle aille chercher les données sauvegardées si elles existent, ou utiliser des tasks par défault dans le cas contraire. 

Pour récupérer une valeur sauvegardé il suffit d'utiliser la méthode get de l'objet storage qui fonctionne par clé / valeur. Donc en faisant ```get('tasks')``` on obtiendra la veur associée a la clé 'tasks'.

```TypeScript
\\ tasks.ts
  getTasks () {
    this.storage.get('tasks').then(data => {

      if (data == null) {
        data = [
          "Hodor !",
          "HOODOOOOOOOOR !!",
          "Hodor ?"
        ]
      }

      this.tasks = data
    }).catch(error => {
      console.log(error)
    })
  }
```

La fonction get renvoi une Promise. Une Promise est une classe dans laquelle on va renseigner différente méthode à appeller en fonction du succes ou de l'echec d'une méthode. 

Dans notre cas on renseigne la méthode "then" qui sera éxécutée en cas de succes de la récupération des données, et la méthode "catch" qui sera éxécutée en cas d'echec.

Ces deux méthode prenne un parametre qui sera renseignée par la Promise.

Dans le cas de then c'est l'objet sauvegardé pour la clé 'tasks', et dans le cas de catch c'est l'erreur.

Attention, malgrès un succès de récupération des données, le parametre data peut etre null si aucune donnée n'est sauvegardée, c'est pourquoi on intialise une liste par défaut dans ce cas.

Voilà pour la récupération, mainteneant on va faire en sorte que toutes modifications de la liste entraine une sauvegarde de celle - ci.
Pour cela on va utiliser la méthode ```set(key, value)``` de storage. Avec cette méthode on va enregistrer notre tableau dans la clé "tasks" a chaque fois qu'on modifie le tableau. Il nous suffit donc d'ajouter cette ligne 

```TypeScript
  this.storage.set('tasks', this.tasks).then(data => {
    this.tasks = data
  }).catch(error => {
    console.log(error)
  })
``` 

A chaque fois qu'on modifie la liste des tâche (donc a la fin des méthode edit, delete et add)

## Connexion avec une api

Beaucoup d'app ne serait pas aussi utile sans la possibilité d'echanger des données avec un serveur.

Nous allons voir comment procéder dès maintenant.

### Utiliser une api REST avec HttpClient

Une api REST est en fait un ensemble d'url a appeller depuis notre application pour échanger des données avec le serveur. Une meme url avec une méthode different (POST, GET, PUT ou DELETE) aura un effet different sur la ressource pointé par l'url. Par exemple appeller l'url http://api.demo.com/image1 avec la méthode GET nous renverra l'image alors qu'appeler la meme url avec le méthode DELETE l'effacera. Bien sur le serveur peut faire des vérifications d'authentification pour empêcher une personne de modifier certaine ressources ou non.

Dans notre exemple nous allons utiliser une simlple api de démonstration : https://jsonplaceholder.typicode.com/

Pour récupérer une liste de tache nous devrons donc entrer l'url suivante : https://jsonplaceholder.typicode.com/todos

Pour utiliser les requete http commencez par decommenter les lignes relatives a httpClient dans le tasksProvider (l'import et le constructeur)

Il faut aussi modifier le fichier app.module.ts pour ajouter httpClient a la liste des import et provider, comme ceci :

```TypeScript
\\ app.module.ts
import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule, HttpClient } from '@angular/common/http'; // ajouter cet import

import { MyApp } from './app.component'
import { HomePageModule } from '../pages/home/home.module'
import { TasksProvider } from '../providers/tasks/tasks';
import { TestProvider } from '../providers/test/test';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    IonicStorageModule.forRoot(),
    HttpClientModule // importer ici
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TasksProvider,
    TestProvider,
    HttpClient // ajotuer a la liste des providers
  ]
})
export class AppModule {}
```

Quant à votre tasks.ts il devrai ressembler à ceci :

```TypeScript
import { HttpClient } from '@angular/common/http';` // ajouter cet import


@Injectable()
export class TasksProvider {

  tasks : Array<string>

  constructor (
    private storage : Storage,
    public http: HttpClient // injecter http ici
  ) {
    
  } 

//...
```

Bien maintenant on peut utiliser l'api plutot que storage pour récupérer et enregistrer nos tâches.
On va donc commencer par modifier la fonction getTasks() :

```TypeScript
// tasks.ts
export class TasksProvider {
//...
  tasks : Array<any> // remplacer le type de tasks : Array<string> en Array<any>
//...
  getTasks () {
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(
      // subscribe prend deux callback en parametre, un pour le succes de la requete et un pour l'echec
      data => {
        this.tasks = data
    }, err => {
      console.log(err)
    });
  }
```

Si on actualise on constate qu'on a plein de nouvelle tâche mais qu'elles ont toute le nom "object Object". C'est normale car l'api renvoi une liste d'objet et non une liste de string. Or notre todo-item prend en parametre la string qui contient la tache a afficher.

La structure de l'objet est la suivante :
```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

On vois donc qu'il va falloire adapter notre todo-item pour qu'il affiche le title de l'item et nom l'item. Voici comment procéder :

Tout d'abord dans notre home.html on va changer la façon dont on injecte les donné dans notre todo-item.

Avant on avait ceci :
```html
  <todo-item *ngFor="let task of tasksProvider.tasks" (onDelete)="deleteTask(task)" (onEdit)="editTask(task)">
    {{ task }}
  </todo-item>
```

L'invonvéniant de cette méthode c'est qu'elle ne permet de passer que des string dans task. Or on souhaite désormais passer un objet. La nouvelle syntax est donc la suivante : 

```html
  <todo-item *ngFor="let task of tasksProvider.tasks" [item] = "task" (onDelete)="deleteTask(task)" (onEdit)="editTask(task)">
  </todo-item>
```

Avec cette syntax on indique que la variable item de la class todoItem doit etre egale a la task. Il nous faut maintenant déclarer cette variable dans le todo-item.ts

```TypeScript
// todo-item
export class TodoItemComponent {

  @Output() onEdit = new EventEmitter<string>()
  @Output() onDelete = new EventEmitter<string>()

  @Input() item : any // on déclare la variable item. le @Input devant permet de dire qu'on veut pouvoir renseigner cette variable avec la syntax [item] = "task" qu'on a vu dans home.html
```

Voila maintenant notre todo-item a une référence vers l'objet task. Maintnenat il faut modifier le fichier todo-item.html pour affichier le title de l'item.

Avant nous avions ceci :

```html
<button ion-item (click)="toggleCompletion()" [ngClass]="{'done':complete}">
  <ng-content></ng-content>
</button>
```

Mais maintenant nous voulons avoir le contenu de la variable item.title :

```html
<button ion-item (click)="toggleCompletion()" [ngClass]="{'done':item.completed}">
  {{ item.title }}
</button>
```

Aussi, comme l'objet contient l'information de completion, on va utiliser celui la plutot que de sotcker l'information dans le todo-item. C'est pourquoi j'ai aussi mis item.completed dans [ngClass]="{'done':item.completed}".

Normalement maintenant vous devriez à nouveau voir des tâches. Certaines accomplies et d'autre non.

Il y a encore un autre soucis, on ne peut plus cocher ou décocher une case. C'est normale puisque les event sur le clic que nous avons définie modifie la variable complete et pas la variable item.completed de l'objet qu'on a reçu. 
On va donc changer la méthode toggleCompletion () :

```TypeScript
// todo-item.ts
// ...
toggleCompletion () {
  this.item.completed = !this.item.completed
}
```

Maintenant ça fonctionne. Cependant il y a un soucis. En effet normalement il faudrait pouvoir envoyer l'information que la tâche a été cochée au serveur. Or nous n'avons pas accès au provider depuis notre composant. Et c'est de toute façon un mauvaise pratique de modifier les données depuis un composant. 
Il faut donc passer par les events pour signaler a home.ts que la tâche à été cochée, et home.ts manipulera le provider pour que l'info remonte au serveur.

On déclare donc un nouvel EventEmitter :

```TypeScript
// todo-item.ts
@Output() onEdit = new EventEmitter<any>() 
@Output() onDelete = new EventEmitter<any>()
@Output() onToggle = new EventEmitter<any>() // on déclare le nouvel event
// ...
toggleCompletion () {
  this.onToggle.emit() // on l'invoque lorsqu'on clique
}
```

Ensuite on va déclarer la fonction toggleTask dans notre provider :

```TypeScript
// providers/tasks/tasks.ts
toggleTask (id) {
  this.tasks[id].completed = !this.tasks[id].completed
}
```

Enfin on adapte home.html et home.ts pour faire le lien : 

On ajoute d'abord un listener toggleTask sur l'event onToggle de l'item :
```home.html
<todo-item *ngFor="let task of tasksProvider.tasks" [item] = "task" (onDelete)="deleteTask(task)" (onEdit)="editTask(task)" (onToggle)="toggleTask(task)">
</todo-item>
```

puis on déclare cette fonction dans le home.ts :

```TypeScript
// home.ts
toggleTask (task) {
  let taskID = this.tasksProvider.findTask(task)
  this.tasksProvider.toggleTask(taskID)
}
```

Voila on a maintenant le meme résultat mais de cette façon on pourra faire les appels d'api requis pour sauvegarder l'etat de la tache lorsqu'on la coche et décoche.

Enfin ce changement nous force aussi a changer le modal d'edition et d'ajout de tache. En effet avant il retournais une simple string or nous devons maintenant retourner un objet complet a la structure suivante : 

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

On ouvre donc notre fichier edit-task-modal.ts pour renommer taskText en taskObject et le text du constructeur en task. On va aussi initialiser un objet qui respect la structeur dans le cas ou on n'est pas en mode édition de tâche :

```TypeScript
// edit-task-modal.ts
taskObject : any

constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public viewCtrl: ViewController
) {
  let task = this.navParams.get('task')
  if (task != null) {
    this.taskObject = task
  } else {
    this.taskObject = {
      "userId" : 1,
      "id" : -1,
      "title" : "new task",
      "completed" : false
    }
  }
}

cancel () {
  this.viewCtrl.dismiss()
}

validate () {
  this.viewCtrl.dismiss(this.taskObject)
}
```

Enfin on modifie le html de edit-task-modal pour prendre en compte qu'on ne manipule pas juste une string mais un objet et qu'il ne faut pas donc afficher l'objet mais la proprieté title de l'objet , soit taskObject.title :

```html
<ion-item>
  <ion-input type="text" value="" placeholder="Tenir la porte" [(ngModel)]="taskObject.title"></ion-input>
</ion-item>

<button ion-item color="danger" (click)="cancel()">Annuler</button>
<button ion-item color="primary" (click)="validate()" [disabled]="taskObject.title == null || taskObject.title == ''">Valider</button>
```

Et voila notre application est de nouveau fonctionnelle comme avant le changement.

Maintenant on va pouvoir se concentrer sur le provider pour envoyer au serveur les requetes de modifications.

On va commencer par la requete de changement de status de la tâche.
On va donc dans la fonction toggleTask (id).
On commence par cloner l'etat de la tâche puis mettre son status complet a l'inverse de ce qu'il est.
On fait cette operation sur un clone et non sur la donnée affiché parcequ'en en cas d'erreur de communication, l'application affichera un état différent du serveur.
On fait donc les manipulation sur un clone qu'on appliquera seulement une fois la réposne du serveur reçu. 
On va faire une requete de type PUT en passant en parametre le nouvel etat de notre tache. En retour le serveur nous renverra une réponse avec l'etat de la tache sur le serveur.

Voici ce que ça doit donner : 

```TypeScript
// tasks.ts
toggleTask (id) {
  let task = this.tasks[id]
  let nextTaskState = JSON.parse(JSON.stringify(this.tasks[id]))
  nextTaskState.completed = !task.completed
  this.http.put('https://jsonplaceholder.typicode.com/todos/' + task.id, nextTaskState).subscribe(data => {
    this.tasks[id] = data
  }, error => {
    console.log(error)
  })
}
```

C'est le meme principe pour l'edition d'une tache :

```TypeScript
// tasks.ts
editTask (id, title : string) {
  if (task != "" && task != null) {
    let task = this.tasks[id]
    let nextTaskState = JSON.parse(JSON.stringify(this.tasks[id]))
    nextTaskState.title = title
    this.http.put('https://jsonplaceholder.typicode.com/todos/' + task.id, nextTaskState).subscribe(data => {
      this.tasks[id] = data
    }, error => {
      console.log(error)
    })
  }
}
```

Pour l'ajout d'une nouvelle tâche on utilisera POST :

```TypeScript
// tasks.ts
addTask (task : any) {
  this.http.post('https://jsonplaceholder.typicode.com/todos/', task).subscribe(
    data => {
      this.tasks.push(data)
    },
    err => {
      console.log(err)
    }
  )
}
```

Enfin pour la suppression on utilisera DELETE :

```TypeScript
// tasks.ts
deleteTask (task : any) {
  let index = this.findTask(task)
  if (index > -1) {
    this.http.delete('https://jsonplaceholder.typicode.com/todos/' + task.id).subscribe(
      data => {
        this.tasks.splice(index, 1)
      },
      error => {
        console.log(error)
      }
    )
  }
}
```



