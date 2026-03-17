// src/hooks/useTranslationProtection.js
import { useEffect, memo } from 'react';

function patchNodePrototype() {
  if (typeof window === 'undefined' || window.__translatePatchApplied) return;
  window.__translatePatchApplied = true;
  const origRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return origRemoveChild.call(this, child);
  };
  const origInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, refNode) {
    if (refNode && refNode.parentNode !== this) return this.appendChild(newNode);
    return origInsertBefore.call(this, newNode, refNode);
  };
}
patchNodePrototype();

export function useTranslationProtection() {
  useEffect(() => {
    const clearTranslateCookies = () => {
      try {
        ['', `; domain=${window.location.hostname}`, `; domain=.${window.location.hostname}`].forEach((suffix) => {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${suffix}`;
        });
        sessionStorage.removeItem('googtrans');
        localStorage.removeItem('googtrans');
      } catch { }
    };
    clearTranslateCookies();
    const lockHtmlAttrs = () => {
      const html = document.documentElement;
      html.setAttribute('translate', 'no');
      if (!html.classList.contains('notranslate')) html.classList.add('notranslate');
      [...html.classList].filter((c) => c.startsWith('translated-')).forEach((c) => html.classList.remove(c));
      if (html.lang !== 'vi') html.setAttribute('lang', 'vi');
    };
    lockHtmlAttrs();
    const killGTElements = () => {
      document.querySelectorAll([
        'script[src*="translate.google"]', 'script[src*="translate.googleapis"]',
        '[id^="goog-gt-"]', '.goog-te-banner-frame', '.skiptranslate',
        'iframe[id^="deepl"]', '#google_translate_element', '.goog-te-gadget',
      ].join(',')).forEach((el) => { try { el.remove(); } catch { } });
    };
    killGTElements();
    const unwrapFontNodes = (root = document.getElementById('root')) => {
      if (!root) return;
      [...root.querySelectorAll('font')].forEach((font) => {
        const parent = font.parentNode;
        if (!parent) return;
        while (font.firstChild) { try { parent.insertBefore(font.firstChild, font); } catch { } }
        try { parent.removeChild(font); } catch { }
      });
    };
    let restoreTimer = null;
    const scheduleRestore = (flags) => {
      clearTimeout(restoreTimer);
      restoreTimer = setTimeout(() => {
        if (flags.lock)   lockHtmlAttrs();
        if (flags.unwrap) unwrapFontNodes();
        if (flags.kill)   killGTElements();
        clearTranslateCookies();
      }, 50);
    };
    const observer = new MutationObserver((mutations) => {
      const flags = { lock: false, unwrap: false, kill: false };
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.target === document.documentElement) flags.lock = true;
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === 'FONT') flags.unwrap = true;
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.hasAttribute?.('_mstmutation')) { try { node.remove(); } catch { } }
              if (node.nodeName === 'SCRIPT' && (node.src?.includes('translate.google') || node.src?.includes('translate.googleapis'))) {
                flags.kill = true;
                try { node.remove(); } catch { }
              }
            }
          }
        }
      }
      if (flags.lock || flags.unwrap || flags.kill) scheduleRestore(flags);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'lang', 'translate'] });
    const interval = setInterval(() => { killGTElements(); clearTranslateCookies(); lockHtmlAttrs(); }, 3000);
    const onVisibility = () => { if (document.visibilityState === 'visible') { clearTranslateCookies(); lockHtmlAttrs(); killGTElements(); } };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); clearInterval(interval); clearTimeout(restoreTimer); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
}

export const NoTranslate = memo(({ children, as: Tag = 'span', className = '', style }) => (
  <Tag translate="no" className={`notranslate ${className}`.trim()} style={style} data-nosnippet>
    {children}
  </Tag>
));
NoTranslate.displayName = 'NoTranslate';