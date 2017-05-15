/**
 * Created by jarvis on 2016. 12. 29..
 */
(function (window) {
    if (!window.parent.initDone && window.location.pathname === '/context.html') {
        window.parent.initDone = true;
        window.open('/debug.html', '_blank');
    }
})(window);