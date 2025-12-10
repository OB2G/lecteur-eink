# 🐛 CORRECTIONS - Bugs identifiés

## Bug 1 : Marque-pages ne fonctionne pas
## Bug 2 : EPUB mal lu

---

## 🔧 CORRECTION 1 : MARQUE-PAGES

### **Problèmes identifiés :**

1. Sur iOS Safari, la sélection de texte peut être difficile
2. Le bouton marque-page nécessite une sélection active
3. Pas de feedback visuel après création

### **Solutions :**

**A. Améliorer la sélection de texte sur iOS**

Ajouter dans le CSS :
```css
.text-content {
  /* Permettre la sélection de texte sur iOS */
  -webkit-user-select: text !important;
  user-select: text !important;
  -webkit-touch-callout: default;
}

.text-content p {
  /* Permettre la sélection par paragraphe */
  -webkit-user-select: text !important;
  user-select: text !important;
}
```

**B. Ajouter feedback visuel**

Modifier la fonction `toggleBookmark()` :
```javascript
function toggleBookmark() {
  if (!app.currentBook) return;
  const sel = window.getSelection();
  const text = sel.toString().trim();
  
  if (!text) { 
    alert('📖 Sélectionnez du texte d\'abord !\n\nAppuyez longuement sur un mot, puis ajustez la sélection.');
    return; 
  }
  
  const bookId = app.currentBook.id;
  const bookmarks = app.bookmarks[bookId] || [];
  const existing = bookmarks.findIndex(b => b.page === app.currentPage && b.selectedText === text);
  
  if (existing >= 0) {
    bookmarks.splice(existing, 1);
    alert('🗑️ Marque-page supprimé');
  } else {
    const preview = text.length > 50 ? text.substring(0, 50) + '...' : text;
    bookmarks.push({
      page: app.currentPage,
      chapter: app.currentBook.content[app.currentPage].chapter,
      selectedText: text,
      preview,
      timestamp: new Date().toISOString()
    });
    bookmarks.sort((a, b) => a.page - b.page);
    alert('✅ Marque-page créé !');
  }
  
  app.bookmarks[bookId] = bookmarks;
  saveStorage('eink-bookmarks', app.bookmarks);
  sel.removeAllRanges(); // Désélectionner après création
  render();
}
```

---

## 🔧 CORRECTION 2 : PARSING EPUB

### **Problème identifié :**

Le code actuel cherche uniquement les `<p>` mais beaucoup d'EPUBs utilisent :
- Des `<div>` avec du texte
- Des `<span>` 
- Du texte directement dans le `<body>`
- Des structures complexes sans `<p>`

### **Solution : Extraction améliorée**

Remplacer la fonction `parseEPUB()` complète :

```javascript
async function parseEPUB(file) {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  
  // Métadonnées
  let title = file.name.replace('.epub', ''), author = 'Inconnu';
  const opfFiles = Object.keys(zip.files).filter(n => n.endsWith('.opf'));
  if (opfFiles.length > 0) {
    const opf = await zip.file(opfFiles[0]).async('string');
    const tm = opf.match(/<dc:title[^>]*>([^<]+)<\/dc:title>/i);
    const am = opf.match(/<dc:creator[^>]*>([^<]+)<\/dc:creator>/i);
    if (tm) title = tm[1].trim();
    if (am) author = am[1].trim();
  }
  
  // Fichiers HTML/XHTML
  const htmlFiles = Object.keys(zip.files)
    .filter(n => (n.endsWith('.html') || n.endsWith('.xhtml')) 
      && !n.includes('nav') 
      && !n.includes('toc')
      && !n.includes('cover'))
    .sort();
  
  const allPages = [];
  
  for (const fname of htmlFiles) {
    const html = await zip.file(fname).async('string');
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Supprimer scripts, styles, metadata
    doc.querySelectorAll('script, style, meta, link').forEach(el => el.remove());
    
    // Trouver titre du chapitre
    const h1 = doc.querySelector('h1, h2, h3, h4');
    const chapterTitle = h1 ? h1.textContent.trim() : `Chapitre ${allPages.length + 1}`;
    
    // MÉTHODE AMÉLIORÉE : Extraire TOUT le texte
    const body = doc.querySelector('body');
    if (!body) continue;
    
    // Fonction récursive pour extraire le texte
    function extractText(element) {
      let text = '';
      
      for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const content = node.textContent.trim();
          if (content) text += content + ' ';
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName.toLowerCase();
          
          // Ignorer certains éléments
          if (['script', 'style', 'meta', 'link'].includes(tagName)) continue;
          
          // Ajouter retour à la ligne pour certains éléments
          if (['p', 'div', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(tagName)) {
            const extracted = extractText(node);
            if (extracted.trim()) text += extracted.trim() + '\n\n';
          } else {
            text += extractText(node);
          }
        }
      }
      
      return text;
    }
    
    // Extraire tout le texte du body
    const fullText = extractText(body);
    
    // Découper en paragraphes
    const paragraphs = fullText
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 10); // Au moins 10 caractères
    
    if (paragraphs.length === 0) continue;
    
    // Paginer (~500 mots par page)
    let currentPageText = '', wordCount = 0, pageNum = 1;
    
    for (const para of paragraphs) {
      const words = para.split(/\s+/).filter(w => w.length > 0).length;
      
      if (wordCount + words > 500 && currentPageText) {
        allPages.push({ 
          chapter: pageNum === 1 ? chapterTitle : `${chapterTitle} (partie ${pageNum})`, 
          text: currentPageText.trim() 
        });
        currentPageText = para + '\n\n';
        wordCount = words;
        pageNum++;
      } else {
        currentPageText += para + '\n\n';
        wordCount += words;
      }
    }
    
    // Ajouter la dernière page du chapitre
    if (currentPageText.trim()) {
      allPages.push({ 
        chapter: pageNum === 1 ? chapterTitle : `${chapterTitle} (partie ${pageNum})`, 
        text: currentPageText.trim() 
      });
    }
  }
  
  // Si aucune page extraite, erreur
  if (allPages.length === 0) {
    throw new Error('Impossible de lire ce fichier EPUB. Le format n\'est peut-être pas standard.');
  }
  
  return { 
    title, 
    author, 
    format: 'EPUB', 
    content: allPages, 
    dateAdded: new Date().toISOString(),
    id: Date.now().toString()
  };
}
```

---

## 📋 RÉSUMÉ DES CORRECTIONS

### **Marque-pages :**
1. ✅ Amélioration CSS pour sélection iOS
2. ✅ Feedback visuel (alertes)
3. ✅ Message d'aide si pas de sélection

### **EPUB :**
1. ✅ Extraction récursive de TOUT le texte (pas juste `<p>`)
2. ✅ Support des EPUBs avec structure diverse
3. ✅ Exclusion des fichiers nav/toc/cover
4. ✅ Meilleur découpage en paragraphes
5. ✅ Message d'erreur si EPUB illisible

---

## 🚀 INSTALLATION

Je vais créer un nouveau `index.html` complet avec ces corrections.
