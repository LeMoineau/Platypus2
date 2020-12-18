# Platypus2
On va try de faire un truc de bg

# Pour te connecter à Git
- installe Git (pas GitHub, juste Git)
- créer un dossier
- fait clique-droit "Git Bash Here"
- puis dans l'invite de commande tape les commandes suivantes:
  - git init
  - git config --global user.name "TonNom"
  - git config --global user.email "TonMail"
  - git remote add origin https://github.com/LeMoineau/Platypus2.git
  - git pull origin main

Yes ! Tu as maintenant les fichiers du projet actuel

# Pour ajouter des fichiers / les modifier
- écrit ton code, fait tes bails sur ton éditeur préféré
- une fois terminé tape les commandes suivantes
  - git remote add origin https://github.com/LeMoineau/Platypus2.git
  - git add .
  - git commit -m "description de ce que t'as fait"
  (- git branch nomDeTaBranche)
  - git push -u origin nomDeTaBranche

De base, on va dire que l'on doit push sur la branch "preprod", donc tu dois faire
- git branch -M preprod
