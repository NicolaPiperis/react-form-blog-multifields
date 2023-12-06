import { useState, useEffect } from 'react';

function App() {
  
  const initialFormData = {
    title: '',
    description: '',
    image: '',        
    content: '',      
    category: '',    
    tags: [],         
    published: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [articleTitleList, setArticleTitleList] = useState([]);

  useEffect(() => {
      alert("Benvenuto");
    
  }, []);


  // Funzione per aggiornare il form quando un campo cambia
  function updateFormData(newValue, fieldName) {
    const newFormData = { ...formData };
    newFormData[fieldName] = newValue;
    setFormData(newFormData);
  }

  // Funzione per gestire i cambiamenti nei checkbox dei tags
  function handleTagChange(tag) {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter(existingTag => existingTag !== tag)
      : [...formData.tags, tag];
    updateFormData(newTags, 'tags');
  }

  // Funzione per gestire l'invio del form
  function handleFormSubmit(e) {
    // Evita il refresh della pagina come normalmente farebbe il form
    e.preventDefault();

    // Aggiungi l'articolo alla lista articleTitleList
    setArticleTitleList([...articleTitleList, { ...formData, id: crypto.randomUUID() }]);

    // Resetta il form
    setFormData(initialFormData);
  }

  // Funzione per rimuovere un articolo dalla lista
  function removeArticle(idToRemove) {
    setArticleTitleList(articleTitleList.filter((article) => article.id !== idToRemove));
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className='mb-4'>

        <div>
          <label htmlFor="title_article" className='block font-bold mb-2'>title</label>
          <textarea name='title' placeholder="Enter article's title" className="border px-3 py-4 w-full" value={formData.title} onChange={(e) => updateFormData(e.target.value, 'title')}></textarea>
        </div>

        <div>
          <label htmlFor="image_article" className='block font-bold mb-2'>Image</label>
          <input type="text" name='image' placeholder="Enter article's image URL" className="border px-3 py-4 w-full" value={formData.image} onChange={(e) => updateFormData(e.target.value, 'image')}/>
        </div>

        <div>
          <label htmlFor="content_article" className='block font-bold mb-2'>Content</label>
          <textarea name='content' placeholder="Enter article's content" className="border px-3 py-4 w-full" value={formData.content} onChange={(e) => updateFormData(e.target.value, 'content')}></textarea>
        </div>

        <div>
          <label htmlFor="category_article" className='block font-bold mb-2'>Category</label>
          {/* Modifica per utilizzare un elemento select */}
          <select name="category" className="border px-3 py-4 w-full" value={formData.category} onChange={(e) => updateFormData(e.target.value, 'category')}>
            <option value="" disabled>Select a category</option>
            <option value="Category1">Category 1</option>
            <option value="Category2">Category 2</option>
            {/* Aggiungi ulteriori opzioni secondo le tue esigenze */}
          </select>
        </div>

        <div>
          <label className='block font-bold mb-2'>Tags</label>
          <div>
            <label>
              <input type="checkbox" name="tag" value="#Sport" checked={formData.tags.includes('#Sport')} onChange={() => handleTagChange('#Sport')}/> #Sport 
              <br />
              <input type="checkbox" name="tag" value="#Politica" checked={formData.tags.includes('#Politica')} onChange={() => handleTagChange('#Politica')}/> #Politica
            </label>
          </div>
        </div>

        <div>
          <label className='block font-bold mb-2'>Published</label>
          <input type="checkbox" name="published" checked={formData.published} onChange={() => updateFormData(!formData.published, 'published')}/>
        </div>

        <button className="mt-2 px-4 py-3 bg-green-300 hover:bg-green-600">Submit</button>

      </form>

      {/* Visualizzazione degli articoli */}
      <div>

        <ul>
          {articleTitleList.map((article) => (

            <li key={article.id} className="flex py-4 border-b items-center">

              {article.image && <img src={article.image} alt="Article Image" className="max-w-full h-auto mb-2" />}

              {article.title && <span className="mb-2"><strong>Titolo</strong> {article.title}</span>}

              {article.content && <p className="mb-2"><strong>Descrizione</strong> {article.content}</p>}

              {article.category && <p className="mb-2"><strong>Category:</strong> {article.category}</p>}

              {article.tags && article.tags.length > 0 && (
                <div className="mb-2">
                  <strong>Tags:</strong> {article.tags.join(', ')}
                </div>
              )}

              {article.published && <p className="mb-2"><strong>Stato:</strong> Pubblicato</p>}

              <button onClick={() => removeArticle(article.id)} className="w-6 h-6 flex items-center justify-center ml-auto bg-red-500 text-white font-bold">
                X
              </button>
            </li>

          ))}
        </ul>

      </div>
    </>
  );
}

export default App;
