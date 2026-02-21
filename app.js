const offers = [
  {
    title: 'MVZ Mitte – Hausärztliche Versorgung',
    district: 'Mitte',
    category: 'Hausarzt',
    info: 'Allgemeinmedizin, Labor und digitale Sprechstunde.',
  },
  {
    title: 'Kinderarztzentrum Pankow',
    district: 'Pankow',
    category: 'Kinderheilkunde',
    info: 'Vorsorgeuntersuchungen, Impfberatung und Akutsprechstunde.',
  },
  {
    title: 'Berliner Krisendienst Kreuzberg',
    district: 'Friedrichshain-Kreuzberg',
    category: 'Psychische Gesundheit',
    info: 'Soforthilfe bei seelischen Krisen – auch anonym.',
  },
  {
    title: 'Gesundheitsamt Charlottenburg',
    district: 'Charlottenburg-Wilmersdorf',
    category: 'Prävention',
    info: 'Impfaktionen, HIV/STI-Beratung und Gesundheitskurse.',
  },
  {
    title: 'Pflegestützpunkt Neukölln',
    district: 'Neukölln',
    category: 'Pflegeberatung',
    info: 'Beratung zu Pflegegrad, Entlastung und Leistungen.',
  },
  {
    title: 'Poliklinik Marzahn',
    district: 'Marzahn-Hellersdorf',
    category: 'Hausarzt',
    info: 'Allgemeinmedizin mit Fokus auf chronische Erkrankungen.',
  },
  {
    title: 'Gesundheitszentrum Tempelhof',
    district: 'Tempelhof-Schöneberg',
    category: 'Prävention',
    info: 'Ernährungsberatung, Rückenkurse und Gesundheitschecks.',
  },
  {
    title: 'Familienpraxis Spandau',
    district: 'Spandau',
    category: 'Kinderheilkunde',
    info: 'Kinder- und Jugendmedizin inklusive Vorsorge und Impfsprechstunde.',
  },
];

const districtFilter = document.getElementById('district-filter');
const categoryFilter = document.getElementById('category-filter');
const searchFilter = document.getElementById('search-filter');
const resetFiltersButton = document.getElementById('reset-filters');
const resultCount = document.getElementById('result-count');
const results = document.getElementById('results');
const emptyState = document.getElementById('empty-state');
const districtCountElement = document.getElementById('district-count');

const districts = [...new Set(offers.map((offer) => offer.district).sort((a, b) => a.localeCompare(b)))];

if (districtCountElement) {
  districtCountElement.textContent = `${districts.length} Bezirke`;
}

districts.forEach((district) => {
  const option = document.createElement('option');
  option.value = district;
  option.textContent = district === 'alle' ? 'Alle Bezirke' : district;
  districtFilter.append(option);
});

function updateResultCount(count) {
  const suffix = count === 1 ? 'Angebot gefunden' : 'Angebote gefunden';
  resultCount.textContent = `${count} ${suffix}`;
}

function render(items) {
  results.innerHTML = '';
  updateResultCount(items.length);

  if (!items.length) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
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
      offer.info.toLowerCase().includes(query);

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
