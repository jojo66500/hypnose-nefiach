// Redirections SEO pour préserver le référencement de l'ancien site
// À inclure dans le <head> de toutes les pages

(function() {
    'use strict';
    
    // Table de correspondance des anciennes URLs vers les nouvelles
    const redirections = {
        // Ancien site vers nouveau site
        '/accueil': '/',
        '/contact': '/#contact',
        '/tarifs': '/#contact',
        '/hypnose': '/hypnose-anxiete-nefiach.html',
        '/anxiete': '/hypnose-anxiete-nefiach.html',
        '/stress': '/hypnose-anxiete-nefiach.html',
        '/burnout': '/#specializations',
        '/depression': '/#specializations',
        '/traumatisme': '/#specializations',
        '/rdv': '/#contact',
        '/rendez-vous': '/#contact',
        '/consultation': '/#contact',
        '/seances': '/#contact',
        '/a-propos': '/#about',
        '/temoignages': '/#testimonials',
        '/therapie': '/',
        '/hypnotherapeute': '/',
        '/nefiach': '/',
        '/perpignan': '/',
        '/prades': '/',
        '/pyrenes-orientales': '/',
        
        // Redirections de pages spécifiques
        '/hypnose-anxiete': '/hypnose-anxiete-nefiach.html',
        '/crise-angoisse': '/hypnose-anxiete-nefiach.html',
        '/attaque-panique': '/hypnose-anxiete-nefiach.html',
        '/troubles-anxieux': '/hypnose-anxiete-nefiach.html'
    };
    
    // Fonction de redirection
    function handleRedirection() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        // Vérifier si une redirection est nécessaire
        if (redirections[currentPath]) {
            const newUrl = redirections[currentPath];
            
            // Redirection 301 simulée (via JavaScript)
            if (history.replaceState) {
                history.replaceState(null, null, newUrl);
                
                // Si c'est une ancre, faire défiler vers la section
                if (newUrl.includes('#')) {
                    const targetId = newUrl.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        setTimeout(() => {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 100);
                    }
                }
            } else {
                // Fallback pour anciens navigateurs
                window.location.href = newUrl;
            }
        }
    }
    
    // Gestion des paramètres URL pour le tracking
    function preserveUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {};
        
        // Préserver les paramètres UTM pour le tracking
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'].forEach(param => {
            if (urlParams.has(param)) {
                utmParams[param] = urlParams.get(param);
            }
        });
        
        // Stocker en sessionStorage pour les conversions
        if (Object.keys(utmParams).length > 0) {
            sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
        }
    }
    
    // Redirection pour les moteurs de recherche (améliore le SEO)
    function handleSEORedirections() {
        const referrer = document.referrer;
        const isFromSearch = referrer && (
            referrer.includes('google.') ||
            referrer.includes('bing.') ||
            referrer.includes('yahoo.') ||
            referrer.includes('duckduckgo.')
        );
        
        if (isFromSearch) {
            // Marquer que l'utilisateur vient d'un moteur de recherche
            sessionStorage.setItem('traffic_source', 'search');
            
            // Analytics personnalisé (optionnel)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'search_traffic', {
                    'source': 'organic',
                    'page': window.location.pathname
                });
            }
        }
    }
    
    // Exécuter au chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        handleRedirection();
        preserveUTMParameters();
        handleSEORedirections();
    });
    
    // Pour les pages avec navigation AJAX
    window.addEventListener('popstate', handleRedirection);
    
})();
