# 🔍 DEBUG - EXTRACTION COUVERTURE

## 🎯 **COMMENT TESTER**

### **1. Ouvrez la Console Chrome**

1. Chrome → `https://ob2g.github.io/lecteur-eink/`
2. **F12** (ouvre DevTools)
3. Onglet **Console**
4. **Ctrl+Shift+R** (forcer rechargement)

### **2. Importez votre EPUB**

Cliquez sur "Importer un livre" et sélectionnez votre EPUB

### **3. Regardez les logs**

Vous devriez voir :

```
=== DÉBUT PARSING EPUB ===
Titre: La femme de ménage
Auteur: Freida McFadden
📷 Recherche de la couverture...
📷 Cover ID: cover
📷 Chemin couverture: cover1.jpeg
✅ Couverture extraite (metadata)
```

---

## ✅ **SI ÇA MARCHE**

Vous verrez :
- `✅ Couverture extraite (metadata)` OU
- `✅ Couverture extraite (fallback)`

Puis dans la bibliothèque, la couverture s'affiche !

---

## ❌ **SI ÇA NE MARCHE PAS**

### **Scénario 1 : Erreur dans les logs**

```
❌ Erreur extraction: [message]
```

→ Copiez le message d'erreur et envoyez-le moi

### **Scénario 2 : Fichier introuvable**

```
❌ Fichier couverture introuvable: cover1.jpeg
```

→ Le chemin est peut-être incorrect

### **Scénario 3 : Aucune couverture trouvée**

```
⚠️ Aucune couverture trouvée
```

→ L'EPUB n'a vraiment pas de couverture

### **Scénario 4 : Rien dans les logs**

→ Le code n'a pas été exécuté, problème de cache

---

## 🔧 **MÉTHODES D'EXTRACTION**

### **Méthode 1 : Via metadata (préférée)**

```
1. Lit le .opf
2. Trouve <meta name="cover" content="cover"/>
3. Trouve <item id="cover" href="cover1.jpeg" .../>
4. Extrait cover1.jpeg
5. Convertit en base64
```

### **Méthode 2 : Fallback (si méthode 1 échoue)**

```
1. Liste tous les fichiers de l'EPUB
2. Cherche les fichiers image (jpg, png, etc.)
3. Filtre ceux qui contiennent "cover" dans le nom
4. Prend le premier
5. Convertit en base64
```

---

## 📊 **STRUCTURE DE VOTRE EPUB**

D'après mon analyse :

```
📁 La femme de ménage.epub
├── 📁 META-INF/
│   └── container.xml
├── content.opf  ← Métadonnées
├── cover1.jpeg  ← 283 KB, 1200x1863px ✅
├── toc.ncx
├── PL0.xhtml
├── PL1.xhtml
├── ...
└── PL72.xhtml
```

**La couverture existe bien !** Elle s'appelle `cover1.jpeg`

---

## 🎯 **TEST MANUEL**

Pour vérifier que l'extraction fonctionne :

### **Dans la Console Chrome :**

```javascript
// Après avoir importé le livre
const livre = app.library[0];
console.log('Couverture:', livre.cover ? 'OUI ✅' : 'NON ❌');

// Si OUI, afficher l'image
if (livre.cover) {
  const img = document.createElement('img');
  img.src = livre.cover;
  img.style.width = '200px';
  document.body.appendChild(img);
}
```

Si l'image s'affiche → L'extraction fonctionne ! 🎉

---

## 💾 **VÉRIFIER LE STOCKAGE**

```javascript
// Dans la Console
const stored = JSON.parse(localStorage.getItem('eink-library'));
console.log('Livres:', stored);
console.log('Premier livre a une couverture:', stored[0]?.cover ? 'OUI' : 'NON');
```

---

## 🐛 **PROBLÈMES CONNUS**

### **1. Cache localStorage plein**

Si vous avez déjà beaucoup de livres :
- localStorage limite : ~5-10 MB
- Couvertures en base64 : ~300-400 KB chacune
- Solution : Supprimer quelques livres

### **2. Cache navigateur**

Même après Ctrl+R, le code peut être en cache :
- **Ctrl+Shift+R** (hard reload)
- Ou vider complètement le cache

### **3. Service Worker**

Le service worker peut cacher l'ancien code :
- Chrome DevTools → Application → Service Workers
- Cliquer "Unregister"
- Recharger la page

---

## 📱 **TESTER SUR IPHONE**

1. Installez la nouvelle version
2. Importez un EPUB
3. Pas de console sur iPhone...
4. Mais vous devriez voir la couverture dans la bibliothèque !

Si pas de couverture :
→ Testez d'abord sur Chrome desktop
→ Regardez les logs
→ Puis on corrige

---

## 🎯 **COMMANDES UTILES**

### **Voir tous les livres :**
```javascript
console.table(app.library.map(b => ({
  titre: b.title,
  couverture: b.cover ? 'OUI' : 'NON'
})));
```

### **Voir la taille du storage :**
```javascript
const size = new Blob([localStorage.getItem('eink-library')]).size;
console.log('Taille bibliothèque:', (size / 1024).toFixed(2), 'KB');
```

### **Forcer réextraction :**
```javascript
// Supprimer tous les livres
app.library = [];
localStorage.removeItem('eink-library');
render();
// Puis réimporter
```

---

**Testez et envoyez-moi les logs de la console ! 🔍**
