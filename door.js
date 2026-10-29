(function(){
  'use strict';
  var body=document.body;
  var root=document.documentElement;
  var query=new URLSearchParams(location.search);
  var savedLang=null,savedMotion=null;
  try{savedLang=localStorage.getItem('4seas-lang');savedMotion=localStorage.getItem('4seas-motion');}catch(e){}

  /* Language preference is presentation only; ALL keeps every translation visible. */
  var nav=(navigator.languages||[navigator.language||'en']).map(function(x){return (x||'').toLowerCase();});
  var pref='en';
  for(var n=0;n<nav.length;n++){
    var code=nav[n].slice(0,2);
    if(code==='th'||code==='zh'||code==='en'){pref=code;break;}
  }
  body.setAttribute('data-pref',pref);
  root.setAttribute('data-detected',pref);
  var mode=query.get('lang')||savedLang||'all';
  if(['all','en','th','zh'].indexOf(mode)<0)mode='all';
  var langButtons=Array.prototype.slice.call(document.querySelectorAll('.langbar button'));
  function setLanguage(next){
    mode=next;
    body.setAttribute('data-mode',next);
    root.lang=next==='all'?'en':(next==='zh'?'zh-Hans':next);
    langButtons.forEach(function(button){
      var active=button.dataset.mode===next;
      button.classList.toggle('on',active);
      button.setAttribute('aria-pressed',String(active));
    });
    try{localStorage.setItem('4seas-lang',next);}catch(e){}
  }
  langButtons.forEach(function(button){button.addEventListener('click',function(){setLanguage(button.dataset.mode);});});
  setLanguage(mode);

  var track=document.getElementById('drive');
  if(!track)return;
  var stage=track.querySelector('.drive-stage');
  var stops=Array.prototype.slice.call(track.querySelectorAll('.drive-stop'));
  var photos=Array.prototype.slice.call(track.querySelectorAll('.scene-photo'));
  var routeButtons=Array.prototype.slice.call(track.querySelectorAll('[data-go]'));
  var prev=document.getElementById('prev-stop');
  var next=document.getElementById('next-stop');
  var begin=document.getElementById('begin-drive');
  var count=document.getElementById('stop-count');
  var motionButton=document.getElementById('motion-toggle');
  var motionLabel=motionButton.querySelector('.motion-label');
  var motionIcon=motionButton.querySelector('.motion-icon');
  var reducedQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
  var current=0;
  var paused=savedMotion==='paused';
  var ticking=false;
  var positions=[
    {x:'68%',y:'75%',s:'1'},
    {x:'65%',y:'67%',s:'.9'},
    {x:'69%',y:'60%',s:'.8'},
    {x:'72%',y:'53%',s:'.7'},
    {x:'73%',y:'46%',s:'.6'}
  ];

  function isLinear(){return reducedQuery.matches;}
  function loadPhoto(index){
    var image=photos[index];
    if(!image||image.getAttribute('src'))return;
    if(image.dataset.srcset)image.srcset=image.dataset.srcset;
    image.src=image.dataset.src;
    image.removeAttribute('data-src');
    image.removeAttribute('data-srcset');
  }
  function setStopAccessibility(){
    var linear=isLinear();
    stops.forEach(function(stop,index){
      if(linear){
        stop.removeAttribute('aria-hidden');
        stop.removeAttribute('inert');
      }else{
        stop.setAttribute('aria-hidden',String(index!==current));
        if(index===current)stop.removeAttribute('inert');else stop.setAttribute('inert','');
      }
    });
  }
  function activate(index){
    current=Math.max(0,Math.min(stops.length-1,index));
    loadPhoto(current);
    loadPhoto(Math.min(current+1,photos.length-1));
    stops.forEach(function(stop,i){stop.classList.toggle('is-active',i===current);});
    photos.forEach(function(photo,i){photo.classList.toggle('is-active',i===current);});
    routeButtons.forEach(function(button,i){
      var active=i===current;
      button.classList.toggle('is-current',active);
      if(active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
    });
    prev.disabled=current===0;
    next.disabled=current===stops.length-1;
    count.textContent=String(current+1).padStart(2,'0')+' / '+String(stops.length).padStart(2,'0');
    body.setAttribute('data-stop',String(current));
    if(stage&&positions[current]){
      var point=positions[current];
      stage.style.setProperty('--travel-x',point.x);
      stage.style.setProperty('--travel-y',point.y);
      stage.style.setProperty('--travel-scale',point.s);
    }
    setStopAccessibility();
  }
  function updateFromScroll(){
    ticking=false;
    if(isLinear())return;
    var rect=track.getBoundingClientRect();
    var available=Math.max(1,track.offsetHeight-window.innerHeight);
    var traveled=Math.max(0,Math.min(available,-rect.top));
    var index=Math.round((traveled/available)*(stops.length-1));
    if(index!==current)activate(index);
  }
  function requestUpdate(){
    if(!ticking){ticking=true;window.requestAnimationFrame(updateFromScroll);}
  }
  function go(index){
    index=Math.max(0,Math.min(stops.length-1,index));
    if(isLinear()){
      stops[index].scrollIntoView({behavior:'auto',block:'start'});
      return;
    }
    var trackTop=window.scrollY+track.getBoundingClientRect().top;
    var available=Math.max(1,track.offsetHeight-window.innerHeight);
    var target=trackTop+(available*index/(stops.length-1));
    activate(index);
    window.scrollTo({top:target,behavior:(paused||isLinear())?'auto':'smooth'});
  }

  prev.addEventListener('click',function(){go(current-1);});
  next.addEventListener('click',function(){go(current+1);});
  if(begin)begin.addEventListener('click',function(){go(1);});
  routeButtons.forEach(function(button){button.addEventListener('click',function(){go(Number(button.dataset.go));});});
  stage.addEventListener('keydown',function(event){
    if(isLinear()||event.altKey||event.ctrlKey||event.metaKey)return;
    if(event.key==='ArrowRight'||event.key==='ArrowDown'){
      event.preventDefault();go(current+1);
    }else if(event.key==='ArrowLeft'||event.key==='ArrowUp'){
      event.preventDefault();go(current-1);
    }
  });
  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate,{passive:true});

  function renderMotion(){
    var reduced=isLinear();
    body.classList.toggle('reduced-motion',reduced);
    body.classList.toggle('motion-paused',paused||reduced);
    motionButton.hidden=false;
    motionButton.disabled=reduced;
    motionButton.setAttribute('aria-pressed',String(paused||reduced));
    if(reduced){
      motionLabel.textContent='Reduced motion';
      motionIcon.textContent='—';
      motionButton.removeAttribute('aria-label');
      motionButton.title='Reduced motion is on; the journey is linear';
    }else if(paused){
      motionLabel.textContent='Play motion';
      motionIcon.textContent='▶';
      motionButton.removeAttribute('aria-label');
      motionButton.title='Play decorative motion';
    }else{
      motionLabel.textContent='Pause motion';
      motionIcon.textContent='Ⅱ';
      motionButton.removeAttribute('aria-label');
      motionButton.title='Pause decorative motion';
    }
    setStopAccessibility();
    requestUpdate();
  }
  motionButton.addEventListener('click',function(){
    if(isLinear())return;
    paused=!paused;
    try{localStorage.setItem('4seas-motion',paused?'paused':'playing');}catch(e){}
    renderMotion();
  });
  if(reducedQuery.addEventListener)reducedQuery.addEventListener('change',renderMotion);
  else if(reducedQuery.addListener)reducedQuery.addListener(renderMotion);

  activate(0);
  renderMotion();
  updateFromScroll();
})();
