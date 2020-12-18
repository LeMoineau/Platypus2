# Platypus 2 (faudrait trouver un vrai nom mdr)

## Install & Start

- npm install
- npm start

## Pour te connecter à Git
- installe Git (pas GitHub, juste Git)
- créer un dossier
- fait clique-droit "Git Bash Here"
- puis dans l'invite de commande tape les commandes suivantes:
  - `git init` **|** *fait de ton dossier un dossier pour git*
  - `git config --global user.name "TonNom"` **|** *tes infos jsp trop pq mais obligatoire*
  - `git config --global user.email "TonMail"`
  - `git remote add origin https://github.com/LeMoineau/Platypus2.git`    **|** *te connecte au projet*
  - `git pull origin main`    **|** *télécharge / update les fichiers de ton dossier par ceux du projet branch main*

Yes ! Tu as maintenant les fichiers du projet actuel

## Pour ajouter des fichiers / les modifier
- écrit ton code, fait tes bails sur ton éditeur préféré
- une fois terminé tape les commandes suivantes
  - (`git remote add origin https://github.com/LeMoineau/Platypus2.git`)
  - `git add .`    **|** *selectionne tous les fichiers de ton dossier*
  - `git commit -m "description stp met en des vrais"`    **|** *prépare l'envoie de tes nouveaux fichiers*
  - `git push -u origin main`    **|** *envoie les fichiers sur la branch main*

## Si tu as peur de casser le code avec de nouvelles fonctionnalités
Lorque tu implémentes de nouvelles choses, tu peux avoir peur que son application casse tout.
Pour éviter ça, tu peux créer une nouvelle branche qui sera séparer mais pas trop de la branche principale "main"
Pour se faire, tapes les commandes suivantes:
- `git branch nomDeTaBranch`    **|** *créer la nouvelle branche dans ton dossier*
- `git add .`    **|** *comme au dessus*
- `git commit -m "description de ce que t'as fait"`
- `git push -u origin nomDeTaBranch`    **|** *envoie tes dossier sur ta branche nouvellement créée*

Voilà, maintenant t'es un pro de Git (ou presque) !
