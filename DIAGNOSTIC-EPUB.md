# 📖 DIAGNOSTIC EPUB - Aidez-moi à comprendre le problème

## ❓ **CE DONT J'AI BESOIN**

Pour corriger le bug EPUB, j'ai besoin de **détails précis** sur ce qui ne va pas.

---

## 📝 **QUESTIONNAIRE DE DIAGNOSTIC**

### **1. Informations sur le livre**

- **Titre du livre EPUB** : _______________
- **Nombre de pages dans l'app** : _____ pages
- **Nombre de pages attendu** : _____ pages (si vous savez)

---

### **2. Que se passe-t-il exactement ?**

Cochez tout ce qui s'applique :

- [ ] Les pages sont trop courtes (juste quelques mots)
- [ ] Les pages sont trop longues (des milliers de mots)
- [ ] Des chapitres entiers manquent
- [ ] Le texte est dans le désordre
- [ ] Il n'y a que des titres, pas de contenu
- [ ] Le découpage est bizarre (coupe au milieu d'une phrase)
- [ ] Autre : _______________________

---

### **3. Exemple concret**

**Page 1 affiche :**

```
[Copiez-collez ici ce que vous voyez sur la page 1]




```

**Page 2 affiche :**

```
[Copiez-collez ici ce que vous voyez sur la page 2]




```

**Ça devrait afficher :**

```
[Dites-moi ce que ça DEVRAIT afficher]




```

---

### **4. Test avec un TXT**

Avez-vous essayé d'importer un fichier **TXT** ?

- [ ] Oui, et ça marche bien
- [ ] Oui, mais ça ne marche pas non plus
- [ ] Non, pas encore essayé

Si **TXT marche** mais pas EPUB → Le problème est dans le parsing EPUB.  
Si **TXT ne marche pas non plus** → Le problème est dans la pagination générale.

---

### **5. Fichier de test**

**Créez un fichier test.txt avec ce contenu :**

```txt
Chapitre 1 - Le début

Ceci est le premier paragraphe. Il contient plusieurs phrases pour tester le système. Voici une autre phrase. Et encore une autre. Le but est d'avoir suffisamment de texte pour voir comment l'application découpe les pages.

Ceci est le deuxième paragraphe. Il continue l'histoire. Avec plus de phrases. Pour remplir l'espace. Et voir si tout s'affiche correctement. Le découpage devrait être naturel. Pas au milieu d'un mot ou d'une phrase.

Ceci est le troisième paragraphe. On continue de la même manière. Avec du texte qui a du sens. Pour simuler un vrai livre. Et tester toutes les fonctionnalités. Comme la pagination automatique. Et le rendu e-ink.

Chapitre 2 - La suite

Maintenant on passe au chapitre deux. Avec un nouveau paragraphe. Qui contient également plusieurs phrases. Pour continuer le test. Et s'assurer que tout fonctionne. Correctement de bout en bout.

Voici un autre paragraphe du chapitre deux. Avec encore plus de contenu. Pour bien remplir les pages. Et voir comment l'application gère les longs textes. Qui s'étendent sur plusieurs lignes. Et plusieurs paragraphes.

Fin du test. Si vous voyez ce texte, c'est que l'import fonctionne. Maintenant testez les marque-pages. Et la navigation entre les pages. Avec les swipes gauche et droite.
```

**Importez ce fichier et dites-moi :**

- Nombre de pages créées : _____
- Page 1 affiche quoi ? _____________________
- Les swipes fonctionnent ? ☐ Oui ☐ Non
- Les marque-pages fonctionnent ? ☐ Oui ☐ Non

---

## 🔍 **TYPES DE PROBLÈMES EPUB COURANTS**

### **Problème A : Pages trop courtes**

**Symptôme :** 1 page = 1 phrase

**Cause possible :** L'EPUB a des `<p>` vides ou très courts

**Solution :** Augmenter le seuil de mots par page

---

### **Problème B : Pages trop longues**

**Symptôme :** 1 page = tout le chapitre

**Cause possible :** L'EPUB n'a pas de `<p>`, tout est dans un seul `<div>`

**Solution :** Améliorer le découpage des paragraphes

---

### **Problème C : Chapitres manquants**

**Symptôme :** Le livre a 10 chapitres, l'app n'en affiche que 3

**Cause possible :** Certains fichiers HTML sont ignorés (nav, toc, cover)

**Solution :** Être moins strict sur les fichiers à ignorer

---

### **Problème D : Texte dans le désordre**

**Symptôme :** Le chapitre 5 apparaît avant le chapitre 2

**Cause possible :** Le tri alphabétique des fichiers ne correspond pas à l'ordre du livre

**Solution :** Lire l'ordre depuis le fichier .opf (spine)

---

### **Problème E : Seulement des titres**

**Symptôme :** Page 1 : "Chapitre 1", Page 2 : "Chapitre 2", pas de contenu

**Cause possible :** Le parsing ne récupère que les `<h1>`, pas le texte

**Solution :** Déjà corrigé dans la dernière version (extraction récursive)

---

## 📊 **QUEL EST VOTRE PROBLÈME ?**

D'après vos symptômes, vous avez probablement le **Problème : _____**

---

## 💡 **ENVOYEZ-MOI CES INFOS**

Remplissez ce questionnaire et envoyez-moi :

1. ✅ Quel problème (A, B, C, D, E, ou autre)
2. ✅ Exemple de ce que vous voyez page 1 et 2
3. ✅ Test avec le fichier TXT (ça marche ou pas ?)

Avec ça, je pourrai créer une correction **sur mesure** ! 🎯

---

**Je suis prêt à corriger dès que vous me donnez ces détails ! 💪**
