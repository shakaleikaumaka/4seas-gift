(function(){
  var b=document.body, q=new URLSearchParams(location.search), saved=null;
  try{saved=localStorage.getItem('4seas-lang')}catch(e){}
  var nav=(navigator.languages||[navigator.language||'en']).map(function(x){return (x||'').toLowerCase()});
  var pref='en'; for(var i=0;i<nav.length;i++){var c=nav[i].slice(0,2); if(c==='th'||c==='zh'||c==='en'){pref=c;break}}
  b.setAttribute('data-pref',pref); document.documentElement.setAttribute('data-detected',pref);
  var mode=q.get('lang')||saved||'all'; if(['all','en','th','zh'].indexOf(mode)<0)mode='all';
  function set(m){b.setAttribute('data-mode',m);document.documentElement.lang=(m==='all'?'en':(m==='zh'?'zh-Hans':m));
    document.querySelectorAll('.langbar button').forEach(function(x){x.classList.toggle('on',x.dataset.mode===m)});
    try{localStorage.setItem('4seas-lang',m)}catch(e){}}
  document.querySelectorAll('.langbar button').forEach(function(x){x.addEventListener('click',function(){set(x.dataset.mode)})});
  set(mode);
})();