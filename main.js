(function(){
document.documentElement.classList.add('has-js');
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var burger = document.getElementById('burger');
var nav = document.getElementById('nav');
if(burger && nav){
burger.addEventListener('click', function(){
var open = nav.classList.toggle('open');
burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.addEventListener('click', function(e){
if(e.target && e.target.tagName === 'A'){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
});
}
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
var openBtns = document.querySelectorAll('[data-reel]');
var modal = document.getElementById('reel-modal');
var lastFocus = null;
function onKey(e){ if(e.key === 'Escape'){ closeModal(); } }
function openModal(){
if(!modal) return;
lastFocus = document.activeElement;
modal.classList.add('open');
modal.setAttribute('aria-hidden','false');
var c = modal.querySelector('[data-close]');
if(c) c.focus();
document.addEventListener('keydown', onKey);
}
function closeModal(){
if(!modal) return;
modal.classList.remove('open');
modal.setAttribute('aria-hidden','true');
document.removeEventListener('keydown', onKey);
if(lastFocus && lastFocus.focus) lastFocus.focus();
}
openBtns.forEach(function(b){ b.addEventListener('click', openModal); });
if(modal){
modal.querySelectorAll('[data-close]').forEach(function(b){ b.addEventListener('click', closeModal); });
}
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
if(window.location.hash === '#thanks'){
var th = document.getElementById('thanks');
if(th){ th.hidden = false; try{ th.scrollIntoView(); }catch(e){} }
}
})();
