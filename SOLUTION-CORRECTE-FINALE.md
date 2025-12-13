# ✅ SOLUTION FINALE - LA BONNE !

## 🎯 **CE QUE VOUS VOULIEZ**

```
┌─────────────────────────────────┐
│ 1                               │ ← En gros (chapter-title)
│                                 │
│ Millie                          │ ← GARDÉ dans le texte
│ — Parlez-moi de vous...         │
└─────────────────────────────────┘
```

**PAS :**
```
┌─────────────────────────────────┐
│ 1                               │ ← En gros
│                                 │
│ 1                               │ ← Répété ❌
│ Millie                          │
└─────────────────────────────────┘
```

---

## 🔧 **SOLUTION**

1. ✅ **GARDER** le `<div class="chapter-title">1</div>` en haut (stylé, en gros)
2. ✅ **FILTRER** SEULEMENT `calibre_5` du texte (le "1" répété)
3. ✅ **GARDER** `calibre_3` dans le texte ("Millie", "Trois mois plus tôt")

---

## 📋 **CODE**

```javascript
const className = node.getAttribute('class') || '';

// Ignorer SEULEMENT calibre_5 (numéro comme "1", "Prologue")
if (className.includes('calibre_5')) {
  continue;  // Sauter
}

// Garder calibre_3 ("Millie", "Trois mois plus tôt")
```

---

## ✅ **RÉSULTAT**

### **Chapitre 1 :**
```
1              ← En gros en haut
Millie         ← Dans le texte ✅
— Parlez-moi de vous...
```

### **Partie I :**
```
PARTIE I       ← En gros en haut
Trois mois plus tôt  ← Dans le texte ✅
Texte...
```

---

## 📱 **LOGS ATTENDUS**

```
🗑️ Ignoré (numéro chapitre): 1
```

**PAS :**
```
🗑️ Ignoré: Millie  ← NON !
🗑️ Ignoré: Trois mois plus tôt  ← NON !
```

---

## 📱 **INSTALLATION**

1. Remplacez `index.html`
2. Actions ✅
3. Videz cache + Réinstaller
4. Réimportez EPUB

---

**Titre en gros en haut, pas répété dans le texte, tout le reste intact ! ✅**
