
(function(){
  // Try likely logo candidates already in your repo (case-sensitive on GitHub Pages)
  const candidates = [
    "/images/logo.png",
    "/Images/logo.png",
    "/images/YRealtyLogo.png",
    "/Images/YRealtyLogo.png",
    "/images/yrealty-logo.png",
    "/Images/yrealty-logo.png",
    "/images/y-realty-logo.png",
    "/Images/y-realty-logo.png",
    "/images/ReenaDutta-logo.png",
    "/Images/ReenaDutta-logo.png"
  ];

  // Favicon candidates
  const favs = [
    "/images/favicon.ico",
    "/Images/favicon.ico",
    "/favicon.ico",
    "/images/favicon-32x32.png",
    "/Images/favicon-32x32.png"
  ];

  function tryLoad(src){
    return new Promise(resolve=>{
      const img = new Image();
      img.onload = ()=>resolve(src);
      img.onerror = ()=>resolve(null);
      img.src = src + (src.indexOf("?")===-1 ? "?v="+Date.now() : "");
    });
  }

  async function pickLogo(){
    for (const c of candidates){
      const ok = await tryLoad(c);
      if (ok){
        const el = document.getElementById("brand-logo");
        if (el){ el.src = ok; el.style.display="inline-block"; }
        // also wire schema logo dynamically for accuracy
        const ld = document.getElementById("rd-jsonld");
        if (ld){
          try {
            const data = JSON.parse(ld.textContent);
            data.logo = ok;
            ld.textContent = JSON.stringify(data);
          }catch(e){}
        }
        return;
      }
    }
  }

  function setFavicon(){
    for (const f of favs){
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = f;
      document.head.appendChild(link);
    }
  }

  pickLogo();
  setFavicon();
})();
