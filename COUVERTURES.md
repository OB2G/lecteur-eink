# 📚 COUVERTURES DE LIVRES - EXTRACTION AUTOMATIQUE

## ✅ **NOUVEAU : Couvertures extraites des EPUB !**

L'app extrait maintenant automatiquement la couverture depuis les fichiers EPUB et l'affiche dans la bibliothèque !

---

## 🎯 **COMMENT ÇA MARCHE**

### **Extraction automatique :**

Quand vous importez un EPUB, l'app :

1. **Lit le fichier `.opf`** (métadonnées)
2. **Cherche la référence** : `<meta name="cover" content="..."/>`
3. **Trouve l'image** dans le manifest
4. **Extrait l'image** du ZIP
5. **Convertit en base64**
6. **Stocke avec le livre** dans localStorage

### **Fallback intelligent :**

Si pas de metadata "cover", l'app cherche automatiquement :
- `cover.jpg`
- `cover.jpeg`
- `cover.png`
- `cover1.jpeg`
- `cover1.jpg`

---

## 📱 **RÉSULTAT DANS LA BIBLIOTHÈQUE**

### **Avant :**
```
┌─────────────────┐
│                 │
│    📖          │  ← Icône générique
│                 │
│ La femme de     │
│ ménage          │
└─────────────────┘
```

### **Maintenant :**
```
┌─────────────────┐
│                 │
│  [COUVERTURE]   │  ← Vraie couverture !
│   DU LIVRE      │
│                 │
│ La femme de     │
│ ménage          │
└─────────────────┘
```

---

## 🔍 **DÉTAILS TECHNIQUES**

### **Structure EPUB (exemple de votre livre) :**

```xml
<!-- Dans le fichier .opf -->
<metadata>
  <meta name="cover" content="cover"/>
</metadata>

<manifest>
  <item id="cover" href="cover1.jpeg" media-type="image/jpeg"/>
</manifest>
```

### **Extraction dans le code :**

```javascript
// 1. Chercher la référence
const coverMetaMatch = opf.match(/<meta\s+name=["']cover["']\s+content=["']([^"']+)["']/i);

// 2. Trouver le fichier
const coverId = coverMetaMatch[1];
const coverItemMatch = opf.match(new RegExp(`<item\\s+id=["']${coverId}["'][^>]*href=["']([^"']+)["']`));

// 3. Extraire l'image
const coverBlob = await coverFile.async('blob');

// 4. Convertir en base64
const reader = new FileReader();
coverImage = await new Promise((resolve) => {
  reader.onload = () => resolve(reader.result);
  reader.readAsDataURL(coverBlob);
});

// 5. Stocker
return {
  title,
  author,
  cover: coverImage, // Base64 data URL
  content: allPages
};
```

---

## 📊 **COMPATIBILITÉ**

### **Formats supportés :**

✅ **EPUB avec couverture** → Extraction automatique  
✅ **EPUB sans couverture** → Fallback icône 📖  
⚠️ **PDF** → Pas d'extraction (pour l'instant)  
⚠️ **TXT** → Pas de couverture  

### **Types d'images :**

✅ JPEG (.jpg, .jpeg)  
✅ PNG (.png)  
✅ GIF (.gif)  
✅ WebP (.webp)  

---

## 💾 **STOCKAGE**

### **Où sont stockées les couvertures ?**

Les couvertures sont stockées **en base64** dans le localStorage avec le livre :

```javascript
{
  id: "livre-123",
  title: "La femme de ménage",
  author: "Freida McFadden",
  cover: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // ← Couverture
  content: [...pages...]
}
```

### **Taille :**

- Image originale : ~280 KB (votre EPUB)
- Base64 : ~375 KB (33% plus gros)
- **Impact :** Acceptable pour localStorage (limite 5-10 MB)

---

## ⚠️ **LIMITATIONS**

### **localStorage :**

- Limite totale : ~5-10 MB selon navigateur
- Avec couvertures : ~10-15 livres max
- Sans couvertures : ~50-100 livres

### **Solution future :**

Si vous avez beaucoup de livres, on peut :
1. **Compresser** les couvertures (redimensionner)
2. **Utiliser IndexedDB** (plus de stockage)
3. **Stocker dans le cloud** (Google Drive, etc.)

---

## 🎨 **AFFICHAGE**

### **CSS de la couverture :**

```css
.book-cover {
  height: 120px;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Remplir sans déformer */
  border-radius: 4px;
}
```

---

## 🚀 **ÉVOLUTIONS FUTURES**

### **Option 1 : API externe (Google Books)**

Si pas de couverture dans l'EPUB :

```javascript
// Chercher sur Google Books API
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`;
const response = await fetch(apiUrl);
const data = await response.json();
const cover = data.items[0]?.volumeInfo?.imageLinks?.thumbnail;
```

**Avantages :**
- ✅ Couverture même si absente de l'EPUB
- ✅ Haute qualité
- ✅ Gratuit (quota Google)

**Inconvénients :**
- ❌ Nécessite connexion internet
- ❌ Peut être lent
- ❌ Pas toujours trouvé

### **Option 2 : Upload manuel**

Permettre à l'utilisateur d'uploader sa propre couverture :

```
┌─────────────────┐
│                 │
│    📖          │
│                 │
│ [Changer la     │
│  couverture]    │
└─────────────────┘
```

### **Option 3 : Compression automatique**

Redimensionner les couvertures pour économiser de l'espace :

```javascript
// Redimensionner à 300x450 max
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 450;
ctx.drawImage(img, 0, 0, 300, 450);
const compressed = canvas.toDataURL('image/jpeg', 0.8);
```

---

## 📱 **INSTALLATION**

1. Remplacez `index.html`
2. GitHub Actions ✅
3. Videz cache Safari
4. Réinstallez l'app
5. **Supprimez les anciens livres**
6. **Réimportez les EPUB**

**Important :** Les livres déjà importés n'ont PAS de couverture (elle n'a pas été extraite). Il faut les réimporter !

---

## 🎊 **RÉSULTAT**

Votre bibliothèque ressemble maintenant à une **vraie bibliothèque** avec des couvertures colorées au lieu d'icônes génériques ! 📚✨

---

## 🐛 **DÉPANNAGE**

### **La couverture n'apparaît pas :**

1. **Vérifiez les logs :** Ouvrez la console (F12)
   - Vous devriez voir : `📷 Cover ID trouvé: cover`
   - Puis : `✅ Couverture extraite`

2. **L'EPUB a une couverture ?**
   - Pas tous les EPUB en ont
   - Essayez avec un autre EPUB

3. **Cache localStorage plein ?**
   - Supprimez quelques livres
   - Ou activez la compression (future feature)

---

**Profitez de vos belles couvertures ! 📚🎨**
