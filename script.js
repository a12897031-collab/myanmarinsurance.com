(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isExpanded));
      navigation.classList.toggle('is-open', !isExpanded);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (menuButton.getAttribute('aria-expanded') === 'true' &&
          !navigation.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });
  }

  const search = document.querySelector('#coverage-search');
  const cards = Array.from(document.querySelectorAll('.coverage-card'));
  const status = document.querySelector('#filter-status');
  const noResults = document.querySelector('#no-results');

  if (search && cards.length && status && noResults) {
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach((card) => {
        const text = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
        const matches = !query || text.includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      noResults.hidden = visibleCount !== 0;
      status.textContent = query
        ? `${visibleCount} ${visibleCount === 1 ? 'topic' : 'topics'} found`
        : '';
    });
  }
})();
