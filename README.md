# Platypus2
Salut

# Pour mettre dans git fait:
- installe Git (pas GitHub, juste Git)
- créer un dossier
- fait clique-droit "Git Bash Here"
- puis dans l'invite de commande tape les commandes suivantes:
  - git init
  - git config --global user.name "TonNom"
  - git config --global user.email "TonMail"
  - git remote add origin https://
  - git restore ./
Yes ! Tu as maintenant les fichiers du projet actuel

# Pour ajouter des fichiers / les modifier
- écrit ton code, fait tes bails sur ton éditeur préféré
- une fois terminé tape les commandes suivantes
  - git remote add origin https://github.com/LeMoineau/Platypus2.git
  - git add .
  - git commit -m "description de ce que t'as fait"
  (- git branch -M nomDeTaBranche)
  - git push -u origin nomDeTaBranche
