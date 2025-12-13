# 🧪 GUIDE DE TEST - COUVERTURE & TITRE

## 🎯 **CHANGEMENTS**

### **1. Couverture : CSS ajouté**
```css
.book-cover img {
  object-fit: contain;  /* Montre l'image entière */
}
```

### **2. Titre : Seuil augmenté à 50 caractères**
```javascript
// Retire les paragraphes < 50 caractères en début de chapitre
while (paragraphs[0].length < 50) {
  paragraphs.shift();
}
```

**Votre livre :**
- "1" = 1 car → RETIRÉ ✅
- "Millie" = 6 car → RETIRÉ ✅
- "Prologue" = 8 car → RETIRÉ ✅
- "— Parlez-moi de vous, Millie." = 31 car → RETIRÉ ✅
- "Nina Winchester se penche..." = 52 car → GARDÉ ✅

---

## 🧪 **TEST SUR CHROME D'ABORD**

### **1. Ouvrez Chrome**
```
https://ob2g.github.io/lecteur-eink/
```

### **2. FORCER le rechargement**
```
Ctrl + Shift + R
```

### **3. Ouvrez la Console**
```
F12 → Onglet "Console"
```

### **4. Importez votre EPUB**

Vous DEVEZ voir ces logs :
```
📷 Recherche de la couverture...
📷 Cover ID: cover
📷 Chemin couverture: cover1.jpeg
✅ Couverture extraite (metadata)
```

Puis pour CHAQUE chapitre :
```
🗑️ Retrait titre potentiel: 1
🗑️ Retrait titre potentiel: Millie
✅ 2 paragraphe(s) de titre retiré(s)
```

### **5. Vérifiez la couverture**

Dans la bibliothèque, faites **clic droit** sur la couverture → **Inspecter**

Vous devriez voir :
```html
<div class="book-cover">
  <img src="data:image/jpeg;base64,..." alt="La femme de ménage">
</div>
```

Puis dans le panneau "Styles" :
```css
.book-cover img {
  object-fit: contain;  /* ← DOIT ÊTRE LÀ */
}
```

### **6. Vérifiez le texte**

Ouvrez le livre, allez au Chapitre 1

Le premier mot affiché devrait être **"Nina"** (pas "1", pas "Millie")

---

## 📱 **TEST SUR IPHONE**

**SEULEMENT après avoir testé sur Chrome !**

### **Nettoyage complet :**

1. **Supprimez l'app** de l'écran d'accueil
2. Réglages → Safari → **Effacer historique et données**
3. Réglages → Safari → **Avancé** → Données de sites web
4. Cherchez "ob2g" → **Supprimer**
5. **Redémarrez l'iPhone** (bouton power)
6. Safari → `https://ob2g.github.io/lecteur-eink/`
7. **Longue pression** sur le bouton de refresh
8. **"Recharger sans utiliser le cache"**
9. Réinstallez l'app
10. Importez EPUB

---

## 🔍 **VÉRIFICATION MANUELLE (CHROME)**

Dans la Console :

### **Test 1 : Vérifier la couverture**
```javascript
const livre = app.library[0];
console.log('A une couverture:', livre.cover ? 'OUI ✅' : 'NON ❌');

// Afficher l'image
if (livre.cover) {
  const div = document.createElement('div');
  div.style.cssText = 'position:fixed;top:50px;right:50px;width:200px;height:300px;background:white;border:2px solid red;z-index:9999;padding:10px;';
  div.innerHTML = `
    <h3>TEST COUVERTURE</h3>
    <img src="${livre.cover}" style="width:100%;height:250px;object-fit:contain;border:1px solid blue;">
  `;
  document.body.appendChild(div);
}
```

**Résultat attendu :** Image COMPLÈTE visible (pas zoomée)

### **Test 2 : Vérifier le premier paragraphe**
```javascript
const livre = app.library[0];
const premierePage = livre.content[0];
console.log('Chapitre:', premierePage.chapter);
console.log('Premier paragraphe:', premierePage.text.split('\n\n')[0]);
```

**Résultat attendu :**
```
Chapitre: Prologue
Premier paragraphe: Un homme, tapis dans l'obscurité...
```

OU pour Chapitre 1 :
```
Chapitre: 1
Premier paragraphe: Nina Winchester se penche en avant...
```

**PAS "1", PAS "Millie" !**

---

## 🐛 **SI ÇA NE MARCHE TOUJOURS PAS**

### **Couverture toujours zoomée :**

1. Inspectez l'élément
2. Vérifiez que `.book-cover img` a `object-fit: contain`
3. Si c'est `cover` → Le CSS n'a pas été chargé
4. Solution : Vider le cache du navigateur

### **Titre toujours dupliqué :**

1. Regardez les logs Console
2. Vous devriez voir `🗑️ Retrait titre potentiel: ...`
3. Si vous ne voyez PAS ces logs → Le code n'a pas été exécuté
4. Solution : Supprimer le livre et réimporter

---

## 🎯 **COMMANDE ULTIME DE DEBUG**

Copiez-collez dans la Console :

```javascript
console.log('=== DIAGNOSTIC COMPLET ===');
const livre = app.library[0];

console.log('📚 Livre:', livre.title);
console.log('📷 Couverture:', livre.cover ? 'OUI ✅' : 'NON ❌');

if (livre.cover) {
  console.log('📏 Taille couverture:', livre.cover.length, 'caractères');
}

console.log('\n📖 PREMIER CHAPITRE:');
const page1 = livre.content[0];
console.log('Titre:', page1.chapter);
console.log('Première page:', page1.isFirstPageOfChapter ? 'OUI' : 'NON');

const paragraphes = page1.text.split('\n\n');
console.log('Nombre de paragraphes:', paragraphes.length);
console.log('\n5 premiers paragraphes:');
paragraphes.slice(0, 5).forEach((p, i) => {
  console.log(`${i+1}. (${p.length} car) ${p.substring(0, 50)}...`);
});

console.log('\n=== FIN DIAGNOSTIC ===');
```

**Envoyez-moi le résultat !**

---

## 📸 **SCREENSHOTS ATTENDUS**

### **Couverture (bibliothèque) :**
```
┌─────────────┐
│             │
│   [IMAGE]   │ ← ENTIÈRE, pas zoomée
│  COMPLÈTE   │
│             │
│  Titre      │
└─────────────┘
```

### **Chapitre 1 :**
```
┌─────────────────────────────────┐
│ 1                               │ ← Une seule fois
│                                 │
│ Nina Winchester se penche...    │ ← Premier paragraphe
└─────────────────────────────────┘
```

**PAS :**
```
┌─────────────────────────────────┐
│ 1                               │
│                                 │
│ 1                               │ ← DUPLIQUÉ ❌
│ Millie                          │ ← DUPLIQUÉ ❌
│ Nina Winchester...              │
└─────────────────────────────────┘
```

---

**Testez sur Chrome et envoyez-moi les résultats des tests ! 🔍**
