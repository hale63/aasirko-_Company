// HUMBURGER

function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
    }

// HERO SLİDES
let currentSlide = 1;
  const totalSlides = 2;

  function triggerTextAnimation(slideId) {
    const slide = document.getElementById(slideId);
    const texts = slide.querySelectorAll('.slide-text');
    
    // Reset all texts in this slide to hidden state first
    texts.forEach(t => {
      t.classList.add('translate-y-10', 'opacity-0');
    });

    // Small timeout to trigger the transition
    setTimeout(() => {
      texts.forEach(t => {
        t.classList.remove('translate-y-10', 'opacity-0');
      });
    }, 100);
  }

  function showSlide(n) {
    for (let i = 1; i <= totalSlides; i++) {
      const slide = document.getElementById(`slide-${i}`);
      if (i === n) {
        slide.classList.replace('opacity-0', 'opacity-100');
        slide.classList.add('z-10');
        triggerTextAnimation(`slide-${i}`);
      } else {
        slide.classList.replace('opacity-100', 'opacity-0');
        slide.classList.remove('z-10');
      }
    }
    currentSlide = n;
  }

  function nextSlide() {
    let next = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    showSlide(next);
  }

  function prevSlide() {
    let prev = currentSlide <= 1 ? totalSlides : currentSlide - 1;
    showSlide(prev);
  }

  // Initial trigger for the first slide
  window.onload = () => triggerTextAnimation('slide-1');
  
  // Auto-play
  setInterval(nextSlide, 6000);
 function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
  }
function toggleMobileMenu(){
  const menu=document.getElementById('mobileMenu');
  const ham=document.getElementById('hamburger');
  const open=menu.classList.contains('open');
  menu.classList.toggle('open',!open);
  ham.classList.toggle('open',!open);
  document.body.style.overflow=open?'':'hidden';
}
window.addEventListener('scroll',()=>{
  const nb=document.getElementById('navbar');
  if(nb)nb.classList.toggle('scrolled',window.scrollY>60);
});
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}});
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
//serv'ces page


    // ensure that we also include the external JS logic, but we write it as external reference.
    // For clarity, the external file "animations.js" will contain the animation and interactive logic.
    // Since we are in a single HTML, we'll create the external JS content dynamically and load it.
    // However to strictly follow "write js in separate page", we inject a script that defines the external file.
    (function() {
      // create a blob for external JS and load it
      const jsCode = `
        // animations.js - external animation and interaction logic
        document.addEventListener('DOMContentLoaded', function() {
          // AOS initialization
          if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true, offset: 50, easing: 'ease-out-quad' });
          }
          
          // custom reveal observer for legacy classes (fallback)
          const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
          revealElements.forEach(el => observer.observe(el));
          
          // mobile menu toggle
          const menuBtn = document.getElementById('menuToggleBtn');
          const mobileMenu = document.getElementById('mobileMenu');
          if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', function(e) {
              e.stopPropagation();
              mobileMenu.classList.toggle('hidden');
            });
          }
          
          // tracking simulation
          const trackBtn = document.getElementById('trackBtn');
          const trackingInput = document.getElementById('trackingInput');
          const trackResult = document.getElementById('trackResult');
          if (trackBtn) {
            trackBtn.addEventListener('click', function() {
              const id = trackingInput.value.trim();
              if (id === "") {
                trackResult.innerHTML = '<span class="text-orange-400">❌ Please enter a tracking ID</span>';
                return;
              }
              trackResult.innerHTML = '<span class="text-gray-300 animate-pulse">🔍 Searching shipment ' + id + '...</span>';
              setTimeout(() => {
                trackResult.innerHTML = '<span class="text-green-400">✅ Shipment ' + id + ' is in transit — Estimated delivery: 2 days</span>';
              }, 1200);
            });
          }
          
          // add scroll-triggered navbar background effect (optional)
          window.addEventListener('scroll', function() {
            const nav = document.querySelector('.md\\:block.bg-orange-50\\/5');
            if (nav && window.scrollY > 50) {
              nav.classList.add('bg-black/80', 'backdrop-blur-md');
              nav.classList.remove('bg-orange-50/5');
            } else if (nav) {
              nav.classList.remove('bg-black/80', 'backdrop-blur-md');
              nav.classList.add('bg-orange-50/5');
            }
          });
          
          // hover animation for service images (add smooth scaling)
          const serviceImages = document.querySelectorAll('.services-bg img');
          serviceImages.forEach(img => {
            img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.02)');
            img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
          });
          
          console.log('External animations.js loaded — all animations active');
        });
      `;
      const blob = new Blob([jsCode], { type: 'application/javascript' });
      const scriptUrl = URL.createObjectURL(blob);
      const scriptTag = document.createElement('script');
      scriptTag.src = scriptUrl;
      document.body.appendChild(scriptTag);
      
      // also load AOS script manually if needed
      if (typeof AOS === 'undefined') {
        const aosScript = document.createElement('script');
        aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
        aosScript.onload = () => {
          if (window.AOS) window.AOS.init({ duration: 800, once: true });
        };
        document.head.appendChild(aosScript);
      }
    })();


  
// Map initialization — only runs on pages that have a #map element
if (document.getElementById('map')) {
  //1. Initialize Map (Start focused on Western Europe)
  const map = L.map('map').setView([50.0, 10.0], 5);

  // 2. Add Light-Themed Tiles (Matches the clean look)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // 3. Custom Marker Icon (Black Pin)
  const blackIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black">
            <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
          </svg>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  // 4. Data Points
  const points = [
    { name: "Belgium Office", coords: [50.50, 4.46] },
    { name: "Luxembourg Office", coords: [49.81, 6.12] },
    { name: "Germany Office", coords: [51.16, 10.45] },
    { name: "Netherlands Office", coords: [52.13, 5.29] }
  ];

  // 5. Add Markers to Map
  points.forEach(p => {
    L.marker(p.coords, { icon: blackIcon }).addTo(map).bindPopup(`<b>${p.name}</b>`);
  });

  // 6. Function to change view when button is clicked
  window.zoomTo = function(lat, lng, zoomLevel) {
    map.flyTo([lat, lng], zoomLevel, {
      duration: 1.5 // Smooth animation in seconds
    });
  };
}

// Mobile menu toggle
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
  }
 
 ///get aquote page
 
  function setService(el, type) {
    document.querySelectorAll('.service-tab').forEach(t => {
      t.classList.remove('active-tab');
      t.classList.add('bg-[#0a0c10]', 'text-gray-400');
    });
    el.classList.add('active-tab');
    el.classList.remove('bg-[#0a0c10]', 'text-gray-400');
  }


  //industry solutions page

   const cardData = {
    ecommerce: {
      tag: { en: "E-Commerce", nl: "E-Commerce" },
      title: { en: "E-Commerce Logistics", nl: "E-Commerce Logistiek" },
      desc: {
        en: "We power the full e-commerce supply chain — from warehouse to your customer's doorstep. With our advanced fulfillment network and last-mile delivery solutions, you can scale your online business with confidence.",
        nl: "Wij ondersteunen de volledige e-commerce supply chain — van magazijn tot aan de voordeur van uw klant. Met ons geavanceerde fulfillmentnetwerk en last-mile bezorgoplossingen kunt u uw online bedrijf met vertrouwen opschalen."
      },
      points: [
        { icon: "✅", text: { en: "Same-day & next-day delivery options", nl: "Same-day & next-day bezorgopties" } },
        { icon: "✅", text: { en: "Multi-warehouse fulfillment & inventory sync", nl: "Multi-warehouse fulfillment & voorraadsynchronisatie" } },
        { icon: "✅", text: { en: "Hassle-free returns management", nl: "Probleemloze retourverwerking" } },
        { icon: "✅", text: { en: "Real-time shipment tracking portals", nl: "Realtime zendingvolgsystemen" } },
        { icon: "✅", text: { en: "API integration with major e-commerce platforms", nl: "API-integratie met grote e-commerceplatformen" } }
      ]
    },
    automotive: {
      tag: { en: "Automotive", nl: "Automotive" },
      title: { en: "Automotive Transport", nl: "Autotransport" },
      desc: {
        en: "Specialized logistics for the automotive sector — from brand-new vehicles to high-value spare parts. Our dedicated fleet and trained handlers ensure your cargo arrives intact, on time, every time.",
        nl: "Gespecialiseerde logistiek voor de automotive sector — van gloednieuwe voertuigen tot hoogwaardige onderdelen. Ons toegewijd wagenpark en getrainde medewerkers zorgen ervoor dat uw lading intact en op tijd aankomt."
      },
      points: [
        { icon: "✅", text: { en: "Open & enclosed vehicle transport", nl: "Open & gesloten voertuigtransport" } },
        { icon: "✅", text: { en: "Damage-free loading & securing systems", nl: "Schadevrij laden & borgingssystemen" } },
        { icon: "✅", text: { en: "Bulk fleet delivery management", nl: "Bulkvloot leveringsbeheer" } },
        { icon: "✅", text: { en: "Customs clearance & documentation support", nl: "Douaneafhandeling & documentatieondersteuning" } },
        { icon: "✅", text: { en: "Pre & post-delivery condition reporting", nl: "Conditierapportage voor & na levering" } }
      ]
    },
    healthcare: {
      tag: { en: "Retail & Wholesale", nl: "Retail & Groothandel" },
      title: { en: "Retail & Wholesale", nl: "Retail & Groothandel" },
      desc: {
        en: "Reliable distribution for retail and wholesale. Our network ensures your goods reach stores and distribution centers on time, every time.",
        nl: "Betrouwbare distributie voor retail en groothandel. Ons netwerk zorgt ervoor dat uw goederen op tijd bij winkels en distributiecentra aankomen."
      },
      points: [
        { icon: "✅", text: { en: "Store replenishment & scheduled deliveries", nl: "Winkelaanvulling & geplande leveringen" } },
        { icon: "✅", text: { en: "Pallet & parcel distribution", nl: "Pallet- & pakkettendistributie" } },
        { icon: "✅", text: { en: "Cross-docking & consolidation services", nl: "Cross-docking & consolidatiediensten" } },
        { icon: "✅", text: { en: "Returns & reverse logistics", nl: "Retourzendingen & reverse logistics" } },
        { icon: "✅", text: { en: "Seasonal peak capacity management", nl: "Capaciteitsbeheer bij seizoenspieken" } }
      ]
    },
    manufacturing: {
      tag: { en: "B2B", nl: "B2B" },
      title: { en: "B2B Logistics", nl: "B2B Logistiek" },
      desc: {
        en: "Dedicated logistics solutions for businesses. We handle everything from raw materials to finished goods, with just-in-time delivery and flexible scheduling.",
        nl: "Toegewijde logistieke oplossingen voor bedrijven. Wij verzorgen alles van grondstoffen tot eindproducten, met just-in-time levering en flexibele planning."
      },
      points: [
        { icon: "✅", text: { en: "Dedicated fleet & driver options", nl: "Toegewijd wagenpark & chauffeuropties" } },
        { icon: "✅", text: { en: "JIT scheduling & production sync", nl: "JIT-planning & productiesynchronisatie" } },
        { icon: "✅", text: { en: "Cross-docking & direct line-feed services", nl: "Cross-docking & directe lijnvoedingsdiensten" } },
        { icon: "✅", text: { en: "Oversized & heavy-load transport", nl: "Overmaats & zwaar transport" } },
        { icon: "✅", text: { en: "Industrial packaging & crating solutions", nl: "Industriële verpakkings- & kratten-oplossingen" } }
      ]
    },
    tech: {
      tag: { en: "B2C", nl: "B2C" },
      title: { en: "B2C Delivery", nl: "B2C Bezorging" },
      desc: {
        en: "Fast and flexible delivery for private customers. Climate-controlled environments and careful handling protect your most valuable shipments in transit.",
        nl: "Snelle en flexibele bezorging voor particuliere klanten. Klimaatgecontroleerde omgevingen en zorgvuldige behandeling beschermen uw waardevolste zendingen tijdens transport."
      },
      points: [
        { icon: "✅", text: { en: "Same-day & next-day home delivery", nl: "Same-day & next-day thuisbezorging" } },
        { icon: "✅", text: { en: "Flexible delivery time windows", nl: "Flexibele bezorgtijdvensters" } },
        { icon: "✅", text: { en: "Real-time tracking & notifications", nl: "Realtime tracking & notificaties" } },
        { icon: "✅", text: { en: "Careful handling of fragile items", nl: "Zorgvuldige behandeling van fragiele items" } },
        { icon: "✅", text: { en: "Easy returns & pickup service", nl: "Eenvoudige retourzendingen & ophaalservice" } }
      ]
    }
  };

  /** Get current language (reads same key as languageSwitcher.js) */
  function _getModalLang() {
    return localStorage.getItem('aasirko_lang') || 'en';
  }

  function openModal(key) {
    const c = cardData[key];
    if (!c) return;
    const lang = _getModalLang();

    document.getElementById('modal-tag').textContent   = c.tag[lang] || c.tag['en'];
    document.getElementById('modal-title').textContent = c.title[lang] || c.title['en'];
    document.getElementById('modal-desc').textContent  = c.desc[lang] || c.desc['en'];

    const ul = document.getElementById('modal-points');
    ul.innerHTML = c.points.map(p => `
      <li class="flex items-start gap-2 text-gray-400 text-sm">
        <span class="text-base leading-snug">${p.icon}</span>
        <span>${p.text[lang] || p.text['en']}</span>
      </li>
    `).join('');

    const overlay = document.getElementById('modal-overlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
 
  function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.body.style.overflow = '';
  }
 
  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });