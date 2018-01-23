# Demo Ionic 3
Application simple avec [ionic 3](https://ionicframework.com/).

## Prérequis :bangbang:
1) savoir utiliser le terminal
2) des connaissances en javascript / Typescript
1) nodejs installé 
2) npm installé
3) git installé
3) un accès sudo si vous etes sur une machine de type unix (mac / linux)
4) Avoir un compte sur le site de ionic [ici](https://dashboard.ionicjs.com/signup?source=framework-getting-started&kmid=LYhxNdjwJYsXWpb3MTV5VPGfsaw%3D). Lors de la création de votre compte, choisissez le plan gratuit "KickStarter"
5) Avoir l'application "IonicDev" installé sur son smartphone et se logger avec le compte ionic.

## Installation
Ionic est très simple d'utilisation et permet de débuter un nouveau projet très facilement. Pour commencez nous allons nous assurer d'avoir la dernière version LTS de node.js d'installée sur notre machine et la mettre à jour si ça n'est pas le cas. Pour cela je vous conseil d'utiliser le package "n".

``sudo npm i -g n``

puis

``sudo n lts``

Node est désormais à jour. On peut passer a l'installation de ionic. 

``sudo npm i -g ionic``

Voilà, on est prêt à commencer :ok_hand:.

## Boilerplate
Ionic est livré avec une commande qui facilite le démarrage d'un nouveau projet :

``ionic start ma-super-application`` 

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

``cd ma-super-application``

Puis lancez le serveur de test de ionic :

``ionic serve -c``

Cette commande va lancer un serveur web de test et la recompilation de l'application a chaque changement des sources. Votre navigateur favoris devrait s'ouvrir sur votre application de base. L'opiton -c permet de voir vos ``console.log('testazeaze')`` dans le terminal.

Bien, c'est le moment de lancer l'application IonicDev sur votre smartphone si vous voulez voir le rendu qu'aura votre application sur un mobile. Pour que ça fonctionne il faut que votre téléphone sois sur le meme réseau wifi que votre ordinateur. Si vous etes dans une salle de classe et que vous essayez tous en même temps, IonicDev vous proposera une liste de serveur de test disponible, il faudra choisir celui qui correspond à l'addresse ip de votre machine. Je rappelle, pour voir votre ip ``ipconfig`` sur windows et ``ifconfig`` sur mac / linux.

Bien, voilà, vous voyez votre app sur votre mobile maintenant. Essayer de changer le texte par defaut dans le fichier src/pages/home.html et sauvegardez. BIM ! L'app se recharge toute seul sur votre téléphone et vous voyez le changement. Pratique non ? Bien, maintenant on va pouvoir passer aux choses sérieuses :facepunch:...


