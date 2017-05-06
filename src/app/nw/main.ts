declare const nw;
var win = typeof nw == 'undefined' ? window : nw.Window.get();

// NW.js fix
// window.nw_global = window.global
// window.global = undefined

win.App = {
  name : 'DentalRegistry',
  title : 'Dental Registry',
  version: '1.0',
}

export let Window = win

if(window['nw']) {
  window['nw']['reload'] = (() => {
    console.log(window.location.origin+window.location.pathname+'index.html'+window.location.hash)
    window.location.href = window.location.origin+window.location.pathname+'index.html'+window.location.hash
  })
}
