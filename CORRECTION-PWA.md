# 🔧 CORRECTION - L'app marche dans Safari mais pas sur l'écran d'accueil

## ✅ **LE DIAGNOSTIC**

Votre app fonctionne dans Safari ✓  
Mais erreur quand installée sur l'écran d'accueil ✗

**Cause :** Les fichiers `manifest.json` et `service-worker.js` ont des chemins incorrects pour GitHub Pages.

---

## 🎯 **LA SOLUTION : Remplacer 2 fichiers**

Je vous ai créé des versions **corrigées** de ces 2 fichiers.

---

## 📝 **ÉTAPE 1 : Supprimer les anciens fichiers**

### **Sur GitHub :**

1. Allez dans votre repository `lecteur-eink`

2. **Supprimer manifest.json** :
   - Cliquez sur le fichier **`manifest.json`**
   - Cliquez sur l'icône **🗑️ poubelle** (en haut à droite)
   - Cliquez **"Commit changes"** → **"Commit changes"**

3. **Supprimer service-worker.js** :
   - Retour à la liste des fichiers
   - Cliquez sur **`service-worker.js`**
   - Cliquez sur l'icône **🗑️ poubelle**
   - Cliquez **"Commit changes"** → **"Commit changes"**

---

## 📝 **ÉTAPE 2 : Uploader les nouveaux fichiers**

### **Téléchargez les fichiers corrigés :**

1. [manifest.json corrigé](computer:///mnt/user-data/outputs/lecteur-eink-corrected/manifest.json) - Clic droit → Enregistrer sous
2. [service-worker.js corrigé](computer:///mnt/user-data/outputs/lecteur-eink-corrected/service-worker.js) - Clic droit → Enregistrer sous

### **Uploadez-les sur GitHub :**

1. Dans votre repository, cliquez **"Add file"** → **"Upload files"**

2. Glissez les **2 nouveaux fichiers** :
   - `manifest.json`
   - `service-worker.js`

3. Message : `Correction PWA`

4. Cliquez **"Commit changes"**

---

## ⏳ **ÉTAPE 3 : Attendre le déploiement**

1. Allez dans l'onglet **"Actions"**

2. Attendez que la ligne **"pages build and deployment"** ait une **coche verte ✅**

3. **Ça prend 1-2 minutes**

---

## 🧹 **ÉTAPE 4 : Vider le cache Safari (iPhone)**

**Important !** Il faut vider le cache pour que l'app se mette à jour.

### **Sur votre iPhone :**

1. **Réglages** → **Safari**

2. **Effacer historique et données de sites**

3. Confirmez

---

## 📱 **ÉTAPE 5 : Supprimer l'ancienne app**

1. Sur votre écran d'accueil, **appuyez longuement** sur l'icône "E-ink"

2. **"Supprimer l'app"** → **"Supprimer"**

---

## 🎉 **ÉTAPE 6 : Réinstaller l'app**

1. Ouvrez **Safari**

2. Allez sur : `https://ob2g.github.io/lecteur-eink/`

3. Attendez que la page se charge complètement

4. Cliquez sur **📤 Partager** (en bas)

5. **"Sur l'écran d'accueil"**

6. **"Ajouter"**

---

## ✅ **ÉTAPE 7 : Tester**

1. **Fermez Safari complètement** (swipe up depuis le bas)

2. **Touchez l'icône "E-ink"** sur l'écran d'accueil

3. **L'app doit s'ouvrir sans erreur !** 🎊

---

## ❓ **POURQUOI ÇA NE MARCHAIT PAS ?**

### **Le problème :**

Les anciens fichiers avaient des chemins comme :
- `"start_url": "/"`
- `cache.addAll(['/index.html'])`

Sur GitHub Pages, l'app est dans un **sous-dossier** (`/lecteur-eink/`), donc :
- `"/"` pointait vers `ob2g.github.io/` (votre page GitHub, erreur 404)
- Au lieu de `ob2g.github.io/lecteur-eink/` (votre app)

### **La correction :**

Les nouveaux fichiers utilisent :
- `"start_url": "./"` (relatif)
- `cache.addAll(['./index.html'])` (relatif)

Maintenant ça pointe toujours vers le bon endroit ! ✅

---

## 🎯 **RÉSUMÉ RAPIDE**

1. ❌ Supprimer les 2 anciens fichiers sur GitHub
2. ✅ Uploader les 2 nouveaux fichiers corrigés
3. ⏳ Attendre le déploiement (1-2 min)
4. 🧹 Vider cache Safari
5. 🗑️ Supprimer l'ancienne app
6. 📲 Réinstaller l'app
7. 🎉 Ça marche !

---

## 💡 **SI ÇA NE MARCHE TOUJOURS PAS**

Vérifiez que vous avez bien :

- [ ] Supprimé les **anciens** manifest.json et service-worker.js
- [ ] Uploadé les **nouveaux** fichiers (pas réédité les anciens)
- [ ] Attendu que Actions soit **vert ✅**
- [ ] **Vidé le cache** Safari
- [ ] **Supprimé et réinstallé** l'app (pas juste rafraîchi)

---

**Ça devrait marcher maintenant ! 💪**
