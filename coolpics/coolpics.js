document.querySelector('.menu').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('show');
  });

  function viewerTemplate(pic, alt) {
    return `<div class="expand">
        <button class="close">X</button>
        <img src="norris-full.jpeg" alt="full cool pic" />
      </div>`;
  }
  
  function viewHandler(event) {
    const clickedElement = event.target;
  
    if (clickedElement.tagName === 'IMG') {
      const imgSrc = clickedElement.src.split('-')[0];
      const fullImgSrc = imgSrc + '-full.jpeg';
      const htmlToInsert = viewerTemplate(fullImgSrc, clickedElement.alt);
      document.body.insertAdjacentHTML("afterbegin", htmlToInsert);
      
      const closeButton = document.querySelector('.close');
      closeButton.addEventListener('click', closeViewer);
    }
  }
  
  function closeViewer() {
    const viewer = document.querySelector('.expand');
    if (viewer) {
      viewer.remove();
    }
  }
  
  const gallery = document.querySelector('.gallary');
  gallery.addEventListener('click', viewHandler);
  