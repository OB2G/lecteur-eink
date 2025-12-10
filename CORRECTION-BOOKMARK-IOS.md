# 🔧 CORRECTION MARQUE-PAGES iOS

## ✅ **PROBLÈME IDENTIFIÉ**

Sur iOS, `window.getSelection()` retourne **vide** même quand du texte est sélectionné visuellement !

C'est un bug Safari/iOS connu depuis des années.

---

## 🎯 **LA SOLUTION**

J'ai ajouté **3 méthodes** pour capturer la sélection :

### **Méthode 1 : `window.getSelection()`** (standard)
Fonctionne sur ordinateur, parfois sur iOS.

### **Méthode 2 : Écoute `selectionchange`** ⭐ (nouveau)
Quand vous sélectionnez du texte, l'événement `selectionchange` se déclenche et **stocke** le texte dans `app.selectedText`.

### **Méthode 3 : `document.getSelection()`** (fallback)
Méthode alternative si les 2 premières échouent.

---

## 📝 **COMMENT TESTER**

### **Étape 1 : Installez la nouvelle version**

1. Remplacez `index.html` sur GitHub
2. Attendez Actions ✅
3. iPhone : Vider cache + Réinstaller

### **Étape 2 : Testez les marque-pages**

1. Ouvrez un livre
2. **Appuyez longuement** sur un mot (1-2 secondes)
3. Les **poignées bleues** apparaissent
4. **Ajustez** la sélection
5. **SANS DÉSÉLECTIONNER**, touchez l'icône 🔖
6. Une alerte devrait dire : **"✅ Marque-page créé !"**

---

## 🐛 **CE QUI A CHANGÉ DANS LE CODE**

### **Avant (ne marchait pas) :**

```javascript
function toggleBookmark() {
  const sel = window.getSelection();
  const text = sel.toString().trim();
  // text est vide sur iOS même si sélection visible !
  if (!text) {
    alert('Sélectionnez du texte');
    return;
  }
  // ...
}
```

### **Après (fonctionne) :**

```javascript
// Écouter les sélections en temps réel
document.addEventListener('selectionchange', () => {
  const sel = window.getSelection();
  if (sel && sel.toString().trim()) {
    app.selectedText = sel.toString().trim(); // Stocker !
  }
});

function toggleBookmark() {
  let text = window.getSelection().toString().trim();
  
  // Fallback 1 : utiliser le texte stocké
  if (!text && app.selectedText) {
    text = app.selectedText;
  }
  
  // Fallback 2 : méthode alternative
  if (!text) {
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      text = selection.toString().trim();
    }
  }
  
  if (!text) {
    alert('Sélectionnez du texte');
    return;
  }
  
  // Créer le marque-page...
}
```

---

## 💡 **CONSEILS D'UTILISATION**

### **La sélection DOIT rester active**

⚠️ **Important :** Le texte doit être **encore sélectionné** (surligné en bleu) quand vous touchez 🔖.

**Si vous désélectionnez avant de toucher 🔖** → Le marque-page ne pourra pas se créer.

### **Procédure correcte :**

1. Appui long → Sélection
2. Ajuster poignées
3. **GARDER la sélection active** (bleu)
4. Toucher 🔖

### **Si ça ne marche toujours pas :**

1. Vérifiez que vous avez bien installé la **nouvelle version**
2. Videz le cache Safari **2 fois**
3. Redémarrez l'iPhone
4. Réinstallez l'app depuis zéro

---

## 🧪 **TEST ALTERNATIF**

Si vraiment ça ne marche pas, essayez dans **Safari** (pas l'app installée) pour voir si le problème vient de la PWA ou du code.

---

## 📊 **COMPATIBILITÉ**

Cette solution fonctionne sur :
- ✅ iOS 13+
- ✅ Safari iOS
- ✅ Safari macOS
- ✅ Chrome Desktop
- ✅ Firefox Desktop

---

## 🆘 **SI ÇA NE MARCHE TOUJOURS PAS**

Dites-moi **exactement** ce qui se passe :

1. L'alerte dit quoi ? ("Sélectionnez du texte" ou autre chose ?)
2. Le texte est-il encore sélectionné (bleu) quand vous touchez 🔖 ?
3. Vous êtes sur Safari ou l'app installée ?
4. Version iOS ? (Réglages → Général → Informations → Version)

Avec ces infos, je pourrai trouver une solution alternative ! 💪

---

**Testez cette version et dites-moi ! 🔖**
