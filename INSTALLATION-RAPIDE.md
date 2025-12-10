# 🐛 CORRECTION DES BUGS - Installation

## ✅ **CE QUI A ÉTÉ CORRIGÉ**

### **Bug 1 : Marque-pages** ✅
- Amélioration sélection de texte sur iOS
- Ajout de feedback visuel (alertes)
- Instructions claires pour l'utilisateur

### **Bug 2 : EPUB mal lu** ✅
- Extraction récursive de TOUT le texte (pas juste les `<p>`)
- Support des EPUBs avec structure diverse
- Meilleure gestion des chapitres vides
- Exclusion des fichiers cover/nav/toc

---

## 🚀 **INSTALLATION (3 MINUTES)**

### **Sur GitHub :**

1. Allez dans votre repository `lecteur-eink`

2. **Remplacez juste `index.html`** :
   - Add file → Upload files
   - Glissez le nouveau `index.html`
   - Message : `Correction marque-pages et EPUB`
   - Commit changes

3. **Attendez** Actions → ✅

---

### **Sur iPhone :**

1. **Vider cache** Safari
2. **Supprimer** ancienne app
3. **Réinstaller** depuis Safari

---

## 📖 **TESTER LES CORRECTIONS**

### **Test 1 : EPUB**

1. Importez un fichier EPUB
2. Vérifiez que **tout le texte** est là
3. Vérifiez que les **chapitres sont bien découpés**

**Si ça ne marche toujours pas :**
- Essayez un autre fichier EPUB
- Certains EPUBs très complexes peuvent poser problème

---

### **Test 2 : Marque-pages**

1. Ouvrez un livre
2. **Appuyez longuement** sur un mot
3. **Ajustez la sélection** avec les poignées bleues
4. Touchez l'icône **🔖 Bookmark**
5. Une alerte dit : **"✅ Marque-page créé !"**

**Pour voir vos marque-pages :**
- Touchez l'icône **📚 BookMarked**
- Liste de tous vos marque-pages
- Touchez-en un pour y aller

---

## 💡 **CONSEILS MARQUE-PAGES**

### **Comment sélectionner du texte sur iPhone :**

1. **Appui long** sur un mot (1 seconde)
2. Le mot est sélectionné (en bleu)
3. **Poignées bleues** apparaissent
4. **Glissez les poignées** pour ajuster la sélection
5. Touchez **🔖 Bookmark**

### **Si ça ne marche toujours pas :**

- Vérifiez que vous êtes bien **en mode lecture** (pas bibliothèque)
- Vérifiez que vous **sélectionnez du texte** avant de cliquer bookmark
- L'alerte vous guidera si vous oubliez de sélectionner

---

## 📋 **DÉTAILS TECHNIQUES**

### **Marque-pages - Ce qui a changé :**

**CSS amélioré :**
```css
.text-content {
  -webkit-user-select: text !important;
  -webkit-touch-callout: default;
}
```

**Feedback visuel :**
- ✅ "Marque-page créé !"
- 🗑️ "Marque-page supprimé"
- 📖 Instructions si pas de sélection

---

### **EPUB - Ce qui a changé :**

**Extraction récursive :**
- Avant : Cherchait juste les `<p>`
- Après : Extrait TOUT le texte (div, span, p, etc.)

**Meilleur nettoyage :**
- Exclut cover, nav, toc
- Supprime meta, link, script, style
- Détecte les chapitres vides

**Pagination améliorée :**
- Compte précis des mots
- Chapitres numérotés si plusieurs pages
- Minimum 10 caractères par paragraphe

---

## ✅ **FICHIERS À REMPLACER**

**Fichier unique :** `index.html` (41 Ko)

Les autres fichiers (manifest.json, service-worker.js) n'ont pas changé.

---

## 🆘 **SI ÇA NE MARCHE TOUJOURS PAS**

### **EPUB toujours mal lu ?**

**Causes possibles :**
1. EPUB avec DRM (protection)
2. EPUB avec images uniquement (comic books)
3. Format EPUB très ancien ou non-standard

**Solutions :**
- Essayez avec un EPUB différent
- Utilisez un EPUB converti depuis Calibre
- Certains formats complexes ne sont pas supportés

---

### **Marque-pages ne marche toujours pas ?**

**Causes possibles :**
1. Sélection de texte bloquée par iOS
2. Cache Safari pas vidé
3. Ancienne version encore active

**Solutions :**
1. Vider cache Safari DEUX fois
2. Redémarrer l'iPhone
3. Réinstaller l'app depuis zéro
4. Vérifier que Actions est bien ✅ sur GitHub

---

**Ces corrections devraient résoudre les bugs ! 🎉**
