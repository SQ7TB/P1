# Przedszkole nr 1 — Layer A PoC

Statyczny prototyp publicznej strony **Przedszkola nr 1 z grupą żłobkową w Konstantynowie Łódzkim**. Projekt stanowi warstwę prezentacyjną (Layer A) i został przygotowany z myślą o hostingu na GitHub Pages oraz późniejszym dodaniu osobnej warstwy redakcyjnej.

## Technologie

- semantyczny HTML5,
- responsywny CSS3 bez frameworka,
- JavaScript ES6+ używany do pobierania i renderowania treści,
- lokalne pliki JSON i SVG — bez zewnętrznych bibliotek, trackerów i usług.

## Struktura projektu

```text
assets/
  icons/                # ikony grup
  images/               # ilustracje i miniatury
content/
  groups.json           # grupy przedszkolne
  important-message.json# pasek ważnej informacji
  menu.json             # informacja o aktualnym jadłospisie
  news.json             # wpisy aktualności
  parent-info.json      # skróty, dane kontaktowe i informacje dla rodziców
css/style.css            # cały wygląd i układ responsywny
js/app.js                # pobieranie danych oraz renderowanie interfejsu
index.html               # szkielet strony
```

Pole `showOnHomepage` we wpisach `news.json` decyduje, czy wpis pojawia się w głównym strumieniu. Pole `sourceType` pozwala odróżnić zwykłą aktualność od wpisu utworzonego na podstawie jadłospisu, co przygotowuje model danych na kolejny etap.

## Uruchomienie lokalne

Pliki JSON są pobierane przez `fetch`, dlatego strony nie należy otwierać bezpośrednio przez protokół `file://`. W katalogu projektu uruchom prosty serwer HTTP:

```bash
python3 -m http.server 8000
```

Następnie otwórz <http://localhost:8000/>. Aby zasymulować publikację w podkatalogu GitHub Pages, umieść lub sklonuj projekt w podkatalogu katalogu obsługiwanego przez serwer i otwórz adres w rodzaju `http://localhost:8000/nazwa-repozytorium/`.

## Publikacja na GitHub Pages

1. Wypchnij repozytorium do GitHub.
2. W **Settings → Pages** wybierz **Deploy from a branch**.
3. Wskaż docelową gałąź i katalog `/ (root)`, następnie zapisz ustawienia.
4. Po zakończeniu wdrożenia strona będzie dostępna pod adresem wskazanym przez GitHub Pages.

Wszystkie odwołania do zasobów są względne, a ścieżki do danych są wyznaczane względem modułu `js/app.js`. Dzięki temu strona działa zarówno w domenie głównej, jak i w podkatalogu projektu GitHub Pages.

## Obecne ograniczenia

- Jest to wyłącznie publiczna, informacyjna strona statyczna.
- Przykładowe dane kontaktowe, adres oraz część odnośników (`#`) wymagają zastąpienia właściwymi danymi.
- Nie ma formularzy, bazy danych, analityki ani przetwarzania danych osobowych.
- Nie ma uwierzytelniania, panelu administratora, edycji treści, OAuth ani integracji z GitHub API.
- Poszczególne podstrony nie zostały jeszcze wdrożone.

## Następny etap

Planowany Layer B będzie osobną warstwą redakcyjną, która umożliwi uprawnionym osobom aktualizację plików treści. Nie jest częścią tego PoC.
