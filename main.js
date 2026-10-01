/* ByCUBE v4 - quiet interactions, no libs */
(function(){
document.documentElement.classList.add('has-js');
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* preloader 0-100 about one second */
var pl = document.getElementById('preloader');
var num = document.getElementById('pre-num');
var fill = document.getElementById('pre-fill');
function hidePl(){ if(pl){ pl.classList.add('done'); setTimeout(function(){ if(pl && pl.parentNode){ pl.parentNode.removeChild(pl); } }, 600); } }
if(pl){
if(reduce){ if(num) num.textContent = '100'; hidePl(); }
else{
var t0 = Date.now();
var dur = 950;
function tick(){
var k = Math.min(1, (Date.now() - t0) / dur);
var v = Math.round(k * 100);
if(num) num.textContent = String(v);
if(fill) fill.style.width = v + '%';
if(k < 1){ requestAnimationFrame(tick); } else { setTimeout(hidePl, 120); }
}
requestAnimationFrame(tick);
setTimeout(hidePl, 2500);
}
} 
/* grain canvas tile 128 opacity 0.05 */
var grain = document.getElementById('grain');
if(grain && !reduce){
try{
var s = 128;
grain.width = Math.min(window.innerWidth, 900);
grain.height = Math.min(window.innerHeight, 600);
var ctx = grain.getContext('2d');
var t = document.createElement('canvas');
t.width = s; t.height = s;
var tctx = t.getContext('2d');
var img = tctx.createImageData(s, s);
for(var i = 0; i < img.data.length; i += 4){
var v = Math.floor(Math.random() * 255);
img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 255;
}
tctx.putImageData(img, 0, 0);
var pat = ctx.createPattern(t, 'repeat');
ctx.fillStyle = pat;
ctx.fillRect(0, 0, grain.width, grain.height);
}catch(e){ if(grain.parentNode){ grain.parentNode.removeChild(grain); } }
} else if(grain && reduce){
if(grain.parentNode){ grain.parentNode.removeChild(grain); }
}
/* reveal one for all */
var els = document.querySelectorAll('.rv');
if('IntersectionObserver' in window && !reduce && els.length){
var io = new IntersectionObserver(function(entries){
entries.forEach(function(en){
if(en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); }
});
}, {threshold: 0.12});
els.forEach(function(el){ io.observe(el); });
} else {
els.forEach(function(el){ el.classList.add('on'); });
}
/* showreel modal */
var openBtns = document.querySelectorAll('[data-reel]');
var modal = document.getElementById('reel-modal');
var lastFocus = null;
function openModal(){
if(!modal) return;
lastFocus = document.activeElement;
modal.classList.add('open');
modal.setAttribute('aria-hidden', 'false');
var closeBtn = modal.querySelector('[data-close]');
if(closeBtn) closeBtn.focus();
document.addEventListener('keydown', onKey);
}
function closeModal(){
if(!modal) return;
modal.classList.remove('open');
modal.setAttribute('aria-hidden', 'true');
document.removeEventListener('keydown', onKey);
if(lastFocus && lastFocus.focus) lastFocus.focus();
}
function onKey(e){ if(e.key === 'Escape'){ closeModal(); } }
openBtns.forEach(function(b){ b.addEventListener('click', openModal); });
if(modal){
modal.querySelectorAll('[data-close]').forEach(function(b){ b.addEventListener('click', closeModal); });
var bg = modal.querySelector('.modal-bg');
if(bg) bg.addEventListener('click', closeModal);
}
/* tape drag */
document.querySelectorAll('.tape').forEach(function(tape){
var down = false, sx = 0, sl = 0;
tape.addEventListener('pointerdown', function(e){
down = true; sx = e.clientX; sl = tape.scrollLeft;
try{ tape.setPointerCapture(e.pointerId); }catch(err){}
});
tape.addEventListener('pointermove', function(e){
if(!down) return;
tape.scrollLeft = sl - (e.clientX - sx);
});
['pointerup','pointercancel','pointerleave'].forEach(function(ev){
tape.addEventListener(ev, function(){ down = false; });
});
});
/* thanks anchor */
if(window.location.hash === '#thanks'){
var th = document.getElementById('thanks');
if(th){ th.hidden = false; try{ th.scrollIntoView(); }catch(e){} }
}
})();
