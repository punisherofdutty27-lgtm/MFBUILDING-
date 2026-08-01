# MF BUILDING SA — Guide de mise en ligne (GitHub Pages)

Ce dossier contient **tout le site**, prêt à être déployé. Suivez ce guide dans l'ordre.
L'objectif principal : que la **version anglaise (dossier `en/`) soit bien envoyée**, pour ne plus avoir l'erreur « 404 » sur le bouton EN.

---

## 1. Ce que contient le paquet

```
mf-building-site/
├── index.html                          ← Accueil (français)
├── etancheite-toiture.html
├── etancheite-terrasse.html
├── etancheite-sous-sol.html
├── recherche-de-fuite.html
├── amenagement-exterieur.html
├── veranda-pergola.html
├── renovation-entreprise-generale.html
├── sitemap.xml                         ← plan du site (pour Google)
├── robots.txt
├── CNAME                               ← votre domaine mfbuilding.ch
└── en/                                 ← ⚠️ VERSION ANGLAISE (à ne PAS oublier)
    ├── index.html
    ├── roof-waterproofing.html
    ├── terrace-balcony-waterproofing.html
    ├── basement-waterproofing.html
    ├── leak-detection.html
    ├── outdoor-decking.html
    ├── veranda-pergola.html
    └── renovation-general-contractor.html
```

Chaque page contient déjà son style et le logo (rien d'externe à charger).

---

## 2. LA RÈGLE D'OR (pour éviter l'erreur EN)

> **Le dossier `en/` doit arriver sur GitHub AVEC son nom `en/` devant ses fichiers.**

L'erreur de la dernière fois venait de là : les fichiers anglais avaient été envoyés
sans leur dossier `en/`, donc l'adresse `.../en/` ne trouvait rien → 404.

Les deux pages d'accueil s'appellent **toutes les deux `index.html`** :
- `index.html` à la racine = accueil **français**
- `en/index.html` = accueil **anglais**

C'est normal. Il ne faut simplement pas les mélanger : celle du dossier `en/` reste **dans** `en/`.

---

## 3. Méthode recommandée — GitHub par le navigateur

1. Décompressez le fichier `mf-building-site.zip` sur votre ordinateur.
2. Allez sur votre dépôt GitHub → onglet **Code**.
3. Cliquez **Add file → Upload files**.
4. Ouvrez le dossier décompressé. Sélectionnez **tout** :
   - tous les fichiers de la racine (les `.html`, `sitemap.xml`, `robots.txt`, `CNAME`)
   - **ET le dossier `en/` entier** (glissez le dossier, pas seulement les fichiers qui sont dedans).
5. Glissez-déposez le tout dans la zone d'upload de GitHub.
6. **Vérification importante** : dans la liste des fichiers à envoyer (en bas de page),
   vous devez voir des lignes qui commencent par **`en/`**, par exemple :
   `en/index.html`, `en/roof-waterproofing.html`, etc.
   👉 Si vous ne voyez aucune ligne commençant par `en/`, **le dossier n'a pas été pris** :
   recommencez en glissant bien le **dossier** `en/` lui-même.
7. Écrivez un message (ex. « mise à jour logo + activités ») puis **Commit changes**.

Astuce : Google Chrome, Edge et Firefox conservent bien les dossiers lors du glisser-déposer.
Sur Safari, si le dossier ne passe pas, utilisez Chrome ou la méthode git (section 5).

---

## 4bis. Si le dossier `en/` REFUSE de se glisser (méthode infaillible)

Symptôme : quand vous glissez le dossier `en`, il n'apparaît pas / rien ne se passe.
C'est une limite du navigateur. Solution : on crée d'abord le dossier `en` sur GitHub,
PUIS on y dépose les fichiers un par un (glisser des fichiers simples marche toujours).

**Étape 1 — créer le dossier `en`**
1. Dépôt → **Add file → Create new file**.
2. Dans le champ du **nom**, tapez exactement : `en/temp.txt`
   (dès que vous tapez le `/`, GitHub crée le dossier `en`).
3. Tapez un caractère quelconque dans le fichier → **Commit changes**.

**Étape 2 — déposer les 8 fichiers anglais dedans**
4. Cliquez sur le dossier **`en`** pour entrer dedans.
5. **Add file → Upload files**.
6. Glissez les **8 fichiers** du dossier `en` (les fichiers eux-mêmes) :
   `index.html`, `roof-waterproofing.html`, `terrace-balcony-waterproofing.html`,
   `basement-waterproofing.html`, `leak-detection.html`, `outdoor-decking.html`,
   `veranda-pergola.html`, `renovation-general-contractor.html`.
7. **Commit changes**.

**Étape 3 — nettoyer**
8. Toujours dans `en`, ouvrez `temp.txt` → corbeille → **Commit** pour le supprimer.

Le dossier `en` contient alors les 8 pages, et le bouton EN fonctionne.

**Encore plus simple :** installez **GitHub Desktop** (gratuit), copiez le dossier `en`
dans le dossier local de votre dépôt : l'application conserve la structure toute seule.


---

## 4. Vérifier que tout fonctionne

Après 1 à 2 minutes :
1. Ouvrez votre site.
2. Dans l'onglet **Code** de GitHub, vous devez voir un dossier **`en`** cliquable
   contenant **8 fichiers**. S'il est là, c'est bon.
3. Sur le site, cliquez le bouton **EN** en haut à droite : il doit ouvrir la page anglaise
   (adresse en `.../en/`), sans 404.

---

## 5. (Optionnel) Méthode git — la plus fiable

Si vous utilisez git en ligne de commande :

```bash
# depuis le dossier décompressé
git add .
git commit -m "Mise à jour du site (logo, activités, EN)"
git push
```

`git add .` envoie automatiquement le dossier `en/` avec sa structure. Aucun risque d'oubli.

---

## 6. Votre domaine mfbuilding.ch

Le fichier **CNAME** (déjà inclus) indique à GitHub d'utiliser `mfbuilding.ch`.

Côté GitHub : dépôt → **Settings → Pages → Custom domain** → saisir `mfbuilding.ch` → Save,
puis cocher **Enforce HTTPS** une fois le certificat prêt.

Côté registraire (là où vous avez acheté le domaine) : créez les enregistrements DNS
pointant vers GitHub Pages (4 enregistrements A pour le domaine racine + 1 CNAME pour `www`).
Les valeurs exactes sont fournies par GitHub dans Settings → Pages. La propagation DNS
peut prendre quelques heures.

---

## 7. À ne pas oublier

- **Formulaire de devis** : remplacez `VOTRE_ID_FORMSPREE` dans les formulaires
  (accueil FR et accueil EN) par l'identifiant de votre compte Formspree gratuit,
  sinon les demandes ne vous parviennent pas.

Bon déploiement !
