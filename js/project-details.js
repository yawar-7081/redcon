const projects = {
  structural: {
    title: "Structural Fabrication & Erection",

    category: "Structural",

    mainImage: "./images/Workers.jpeg",

    overview:
      "REDCON provides structural fabrication and erection solutions for industrial project requirements, covering fabrication, assembly, and on-site erection activities.",

    scope: [
      "Structural steel fabrication",
      "Material preparation and assembly",
      "Structural component installation",
      "Site erection and positioning",
      "On-site coordination and execution",
    ],

    work: "The work involves fabrication and assembly of structural components followed by coordinated site erection. Our teams support the execution process with experienced engineers, supervisors, fabricators, and site personnel to meet project requirements.",

    gallery: ["./images/Workers.jpeg"],
  },

  piping: {
    title: "Piping Fabrication & Erection",

    category: "Piping",

    mainImage: "./images/Factory1.jpeg",

    overview:
      "REDCON undertakes industrial piping fabrication and erection activities with attention to fabrication accuracy, fit-up, alignment, installation, and site execution.",

    scope: [
      "Piping fabrication",
      "Pipe cutting and preparation",
      "Fit-up and assembly",
      "Piping erection",
      "Alignment and installation",
    ],

    work: "Our piping teams support fabrication and site erection activities according to project requirements, coordinating fabrication, fit-up, installation, and execution at the project site.",

    gallery: [
      "./images/Factory1.jpeg",
      "./images/Factory1.jpeg",
      "./images/Factory1.jpeg",
    ],
  },

  equipment: {
    title: "Static & Rotary Equipment",

    category: "Equipment",

    mainImage: "./images/Shutdown.jpeg",

    overview:
      "REDCON provides installation and erection support for static and rotary equipment used in industrial facilities, with attention to safe handling, positioning, and alignment.",

    scope: [
      "Equipment installation",
      "Equipment erection",
      "Positioning and alignment",
      "Assembly support",
      "Site execution",
    ],

    work: "Our teams support industrial equipment activities through coordinated site execution, working with experienced personnel to ensure accurate positioning, assembly, and installation according to project requirements.",

    gallery: ["./images/Shutdown.jpeg"],
  },

  scaffolding: {
    title: "Scaffolding & Manpower Supply",

    category: "Site Services",

    mainImage: "./images/Container.jpeg",

    overview:
      "REDCON provides scaffolding and manpower support for industrial fabrication, erection, maintenance, and other site activities.",

    scope: [
      "Industrial scaffolding support",
      "Site access support",
      "Skilled manpower supply",
      "Unskilled manpower supply",
      "Project site workforce support",
    ],

    work: "Our workforce is deployed according to active project requirements, providing skilled and unskilled personnel to support industrial site operations and project execution.",

    gallery: ["./images/Container.jpeg"],
  },
};

const params = new URLSearchParams(window.location.search);

const projectKey = params.get("project");

const project = projects[projectKey];

if (!project) {
  window.location.href = "index.html#projects";
}

if (project) {
  document.getElementById("project-title").textContent = project.title;

  document.getElementById("project-category").textContent = project.category;

  document.getElementById("project-main-image").src = project.mainImage;

  document.getElementById("project-main-image").alt = project.title;

  document.getElementById("project-overview").textContent = project.overview;

  document.getElementById("project-work").textContent = project.work;

  const scopeContainer = document.getElementById("project-scope");

  scopeContainer.innerHTML = project.scope
    .map((item) => `<div>${item}</div>`)
    .join("");

  const gallery = document.getElementById("project-gallery");

  gallery.innerHTML = project.gallery
    .map(
      (image, index) => `
      <div
        class="project-gallery-item"
        data-index="${index}"
      >
        <img
          src="${image}"
          alt="${project.title}"
          loading="lazy"
        />
      </div>
    `,
    )
    .join("");
}



/* ─────────────────────────────────────────
   PROJECT GALLERY LIGHTBOX
   ───────────────────────────────────────── */

const lightbox =
  document.getElementById("projectLightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxCounter =
  document.getElementById("lightboxCounter");

const lightboxClose =
  document.getElementById("lightboxClose");

const lightboxPrev =
  document.getElementById("lightboxPrev");

const lightboxNext =
  document.getElementById("lightboxNext");

let currentImageIndex = 0;

let galleryImages = [];


/* Open lightbox */

function openLightbox(index) {
  if (!galleryImages.length) return;

  currentImageIndex = index;

  updateLightbox();

  lightbox.classList.add("active");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


/* Update image */

function updateLightbox() {
  const image = galleryImages[currentImageIndex];

  lightboxImage.style.opacity = "0";

  setTimeout(() => {

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxCounter.textContent =
      `${currentImageIndex + 1} / ${galleryImages.length}`;

    lightboxImage.onload = () => {
      lightboxImage.style.opacity = "1";
    };

  }, 100);
}


/* Close */

function closeLightbox() {

  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


/* Previous */

function showPreviousImage() {

  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex =
      galleryImages.length - 1;
  }

  updateLightbox();
}


/* Next */

function showNextImage() {

  currentImageIndex++;

  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  updateLightbox();
}


/* Collect gallery images */

document
  .querySelectorAll(".project-gallery-item img")
  .forEach((img, index) => {

    galleryImages.push({
      src: img.src,
      alt: img.alt
    });

    img.parentElement.addEventListener(
      "click",
      () => {
        openLightbox(index);
      }
    );

  });


  lightboxClose.addEventListener(
  "click",
  closeLightbox
);

lightboxPrev.addEventListener(
  "click",
  showPreviousImage
);

lightboxNext.addEventListener(
  "click",
  showNextImage
);

lightbox.addEventListener(
  "click",
  (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      !lightbox.classList.contains("active")
    ) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }

  }
);
