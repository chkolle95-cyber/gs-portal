# gs-portal

Modernes Berliner Gesundheitsportal im **App-Look (Glasmorphose)** mit mehreren Seiten:

- **Anlaufstellen**: Notfallkontakte + große, filterbare Liste von Ärzt:innen und medizinischen Einrichtungen
- **Vorsorge-Tipps**: separate Seite mit Präventions- und Gesundheitsroutinen
- **Apotheken**: separate Seite mit Apothekenübersicht und Notdienst-Hinweis

## Lokal starten

```bash
python3 -m http.server 8000
```

Danach im Browser öffnen:

- <http://localhost:8000/index.html>
- <http://localhost:8000/tipps.html>
- <http://localhost:8000/apotheken.html>
