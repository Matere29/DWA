interface Drawer extends HTMLElement {
    show(): void;
    hide(): void;
}

(function () {
    const drawer = <Drawer>document.querySelector('sl-drawer');
    const openDrawerBtn = document.querySelector('.open-drawer');
    const closeDrawerBtn = document.querySelector('.close-drawer');

    if (!drawer || !openDrawerBtn || !closeDrawerBtn) {
        console.log('You messed up :(');
        return;
    }

    openDrawerBtn.addEventListener('click', () => {
        drawer.show();
    }, false);

    closeDrawerBtn.addEventListener('click', () => {
        drawer.hide();
    }, false);
})();