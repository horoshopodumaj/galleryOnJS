class Gallery {
    constructor(element, options = {}) {
        this.containerNode = element;
        this.size = element.childElementCount;
        this.currentSlide = 0;

        this.manageHTML = this.manageHTML.bind(this);
        this.manageHTML();
    }

    manageHTML() {}
}
