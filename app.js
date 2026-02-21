const offers = [
  {
    title: 'Charité – Campus Mitte',
    district: 'Mitte',
    category: 'Klinik',
    info: 'Universitätsmedizin mit Notaufnahme und zahlreichen Fachkliniken.',
  },
  {
    title: 'Charité – Campus Virchow-Klinikum',
    district: 'Mitte',
    category: 'Klinik',
    info: 'Maximalversorgung, spezialisierte Ambulanzen und Forschung.',
  },
  {
    title: 'Vivantes Klinikum Neukölln',
    district: 'Neukölln',
    category: 'Klinik',
    info: 'Großes Akutkrankenhaus mit internistischen und chirurgischen Zentren.',
  },
  {
    title: 'Vivantes Klinikum im Friedrichshain',
    district: 'Friedrichshain-Kreuzberg',
    category: 'Klinik',
    info: 'Notfallversorgung, Innere Medizin und Fachambulanzen.',
  },
  {
    title: 'DRK Kliniken Berlin Westend',
    district: 'Charlottenburg-Wilmersdorf',
    category: 'Klinik',
    info: 'Klinische Versorgung mit Schwerpunkten in Orthopädie und Innerer Medizin.',
  },
  {
    title: 'Helios Klinikum Berlin-Buch',
    district: 'Pankow',
    category: 'Klinik',
    info: 'Klinikstandort mit Zentrum für Herz-, Gefäß- und Tumormedizin.',
  },
  {
    title: 'Hausarztpraxis am Alexanderplatz',
    district: 'Mitte',
    category: 'Hausarzt',
    info: 'Allgemeinmedizin, Gesundheits-Checks und Impfsprechstunde.',
  },
  {
    title: 'Praxis Dr. med. Weber – Familienmedizin',
    district: 'Tempelhof-Schöneberg',
    category: 'Hausarzt',
    info: 'Hausärztliche Versorgung für Erwachsene und chronische Erkrankungen.',
  },
  {
    title: 'Kiezpraxis Prenzlauer Berg',
    district: 'Pankow',
    category: 'Hausarzt',
    info: 'Allgemeinmedizin, Prävention und reisemedizinische Beratung.',
  },
  {
    title: 'Kinderarztzentrum Pankow',
    district: 'Pankow',
    category: 'Kinderheilkunde',
    info: 'U-Untersuchungen, Impfungen und Akutsprechstunden.',
  },
  {
    title: 'Kinder- und Jugendmedizin Spandau',
    district: 'Spandau',
    category: 'Kinderheilkunde',
    info: 'Pädiatrische Betreuung inklusive Allergie- und Asthmakontrolle.',
  },
  {
    title: 'Praxis für Kardiologie am Ku’damm',
    district: 'Charlottenburg-Wilmersdorf',
    category: 'Facharzt',
    info: 'Kardiologische Diagnostik, Belastungs-EKG und Langzeitmonitoring.',
  },
  {
    title: 'Orthopädiezentrum Berlin Ost',
    district: 'Lichtenberg',
    category: 'Facharzt',
    info: 'Orthopädie, Schmerztherapie und Sportmedizin.',
  },
  {
    title: 'Hautarztpraxis Kreuzberg',
    district: 'Friedrichshain-Kreuzberg',
    category: 'Facharzt',
    info: 'Dermatologie, Hautkrebsscreening und Allergiediagnostik.',
  },
  {
    title: 'Berliner Krisendienst',
    district: 'Friedrichshain-Kreuzberg',
    category: 'Psychische Gesundheit',
    info: 'Krisenintervention und telefonische Unterstützung rund um die Uhr.',
  },
  {
    title: 'Psychotherapeutisches Zentrum Steglitz',
    district: 'Steglitz-Zehlendorf',
    category: 'Psychische Gesundheit',
    info: 'Einzel- und Gruppentherapie bei Depression, Angst und Erschöpfung.',
  },
  {
    title: 'Gesundheitsamt Charlottenburg',
    district: 'Charlottenburg-Wilmersdorf',
    category: 'Prävention',
    info: 'Impfberatung, STI-Sprechstunde und Gesundheitsförderung.',
  },
  {
    title: 'Gesundheitsamt Mitte',
    district: 'Mitte',
    category: 'Prävention',
    info: 'Präventionsangebote, Einschulungsuntersuchungen und Beratung.',
  },
  {
    title: 'Pflegestützpunkt Neukölln',
    district: 'Neukölln',
    category: 'Pflegeberatung',
    info: 'Beratung zu Pflegegrad, Entlastung und Hilfsmitteln.',
  },
  {
    title: 'Pflegestützpunkt Reinickendorf',
    district: 'Reinickendorf',
    category: 'Pflegeberatung',
    info: 'Unterstützung für Angehörige und Koordination von Pflegeleistungen.',
  },
];

const districtFilter = document.getElementById('district-filter');
const categoryFilter = document.getElementById('category-filter');
const searchFilter = document.getElementById('search-filter');
const resetFiltersButton = document.getElementById('reset-filters');
const resultCount = document.getElementById('result-count');
const results = document.getElementById('results');
const emptyState = document.getElementById('empty-state');

const districts = [...new Set(offers.map((offer) => offer.district).sort((a, b) => a.localeCompare(b)))];

districts.forEach((district) => {
  const option = document.createElement('option');
  option.value = district;
  option.textContent = district;
  districtFilter.append(option);
});

function updateResultCount(count) {
  resultCount.textContent = `${count} ${count === 1 ? 'Treffer' : 'Treffer'}`;
}

function render(items) {
  results.innerHTML = '';
  updateResultCount(items.length);

  if (items.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card soft-card';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <span class="meta">${item.district} · ${item.category}</span>
      <p>${item.info}</p>
    `;
    results.append(card);
  });
}

function applyFilters() {
  const district = districtFilter.value;
  const category = categoryFilter.value;
  const query = searchFilter.value.trim().toLowerCase();

  const filtered = offers.filter((offer) => {
    const districtMatch = district === 'alle' || offer.district === district;
    const categoryMatch = category === 'alle' || offer.category === category;
    const queryMatch =
      query.length === 0 ||
      offer.title.toLowerCase().includes(query) ||
      offer.info.toLowerCase().includes(query) ||
      offer.district.toLowerCase().includes(query);

    return districtMatch && categoryMatch && queryMatch;
  });

  render(filtered);
}

function resetFilters() {
  districtFilter.value = 'alle';
  categoryFilter.value = 'alle';
  searchFilter.value = '';
  render(offers);
}

[districtFilter, categoryFilter, searchFilter].forEach((element) => {
  element.addEventListener('input', applyFilters);
});

resetFiltersButton.addEventListener('click', resetFilters);

render(offers);
