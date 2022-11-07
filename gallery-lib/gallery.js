const GalleryClassName = "gallery";
const GalleryLineClassName = "gallery-line";
const GallerySlideClassName = "gallery-slide";

class Gallery {
    constructor(element, options = {}) {
        this.containerNode = element;
        this.size = element.childElementCount;
        this.currentSlide = 0;

        this.manageHTML = this.manageHTML.bind(this);
        this.setParameters = this.setParameters.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.resizeGallery = this.resizeGallery.bind(this);

        this.manageHTML();
        this.setParameters();
        this.setEvents();
    }

    manageHTML() {
        this.containerNode.classList.add(GalleryClassName);
        this.containerNode.innerHTML = `
            <div class="${GalleryLineClassName}">
                ${this.containerNode.innerHTML}
            </div>
        `;
        this.lineNode = this.containerNode.querySelector(`.${GalleryLineClassName}`);
        this.slideNodes = Array.from(this.lineNode.children).map((childNode) =>
            wrapElementByDiv({
                element: childNode,
                className: GallerySlideClassName,
            })
        );
    }

    setParameters() {
        const coordsContainer = this.containerNode.getBoundingClientRect();
        this.width = coordsContainer.width;

        this.lineNode.style.width = `${this.size * this.width}px`;
        Array.from(this.slideNodes).forEach((slideNode) => {
            slideNode.style.width = `${this.width}px`;
        });
    }

    setEvents() {
        this.debouncedResizeGallery = debounce(this.resizeGallery);
        window.addEventListener("resize", this.debouncedResizeGallery);
    }

    destroyEvents() {
        window.removeEventListener("resize", this.debouncedResizeGallery);
    }

    resizeGallery() {
        this.setParameters();
    }
}

function wrapElementByDiv({ element, className }) {
    const wrapperNode = document.createElement("div");
    wrapperNode.classList.add(className);

    element.parentNode.insertBefore(wrapperNode, element);
    wrapperNode.appendChild(element);

    return wrapperNode;
}

function debounce(func, time = 100) {
    let timer;
    return function (event) {
        clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}
