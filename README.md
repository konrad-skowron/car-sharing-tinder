## :construction_worker: Todo

- [x] Usunąć car details z `user/about` screen
- [x] Usunąć/Pomyśleć coś z postcode zwracanym z API (nie każda lokalizacja posiada postcode co powoduje błąd przy zapisie do bazy danych)
- [x] Znowu poprawić screen z wybieraniem i zapisywaniem godziny. Nie wyświetla zera gdy liczba minut jest jednocyfrowa. Powinno byc np. 23:05 a jest 23:5
- [X] Pomyśleć coś z wyświetlaniem adresów bo poki co wyświetlamy address_line1. Czasami ta nazwa nic nie mówi a czasami jest tak długa, że się nie mieści
- [x] Dodać screen edycji usera - żeby mógł dodać opis about me i zmienić nazwę swoją nazwę, numer, zdjęcie
- [x] Rozszerzyć screen edycji usera o przesyłanie zdjęcia
- [x] Podczas tworzenia ogłoszenia dodać pole "imageUrl" i przypisać temu zdjęcie użytkownika, będzie to zdjęcie wyświetlane przy ogłoszeniu
- [x] Ogarnąć link do zdjęcia w home.js (pole user nie zdąży się załadować a jest do niego odwołanie przez co rzuca nullem i się wykłada, na ten moment ustawione, żeby działało)
- [x] Ściągać dane z serwera zawsze jak się wejdzie do home, nie tylko gdy przejdzie logowanie
- [x] Odfiltrować na home tylko przejazdy posiadające samochód
- [x] Matchowanie użytkowników:
  - [x] Dodać nowe pole do obiektu użytkownika. Nazwa pola `matched`, typ pola array. Tablica będzie przechowywała uid przejazdów jakie zmatchował użytkownik
  - [x] Dodać logikę związaną z dodawaniem i usuwaniem uid przejazdu do tej tablicy
  - [x] Dodać nowe pole dla przejadów z samochodem, aby właściciel przejazdu wiedział o pasażerach. Nazwa pola `passengers`, typ pola array. Tablica będzie przechowywała uid użytkowników, którzy zmatchowali ten przejazd
  - [x] Dodać logikę związaną z dodawaniem i usuwaniem uid użytkownika do tej tablicy
- [x] Przenieść ponownie dodawanie przejazdu ze screena `success` na `carDetail`. Dodanie przejazdu działo się zanim ustawił się obiekt carDetails, przez co nie dało się ustawić samochodu dla przejazdu
- [x] Dodać mapę z wyznaczoną trasą do screena przejazdu (`[id].jsx`)
- [x] Zmienić strukture obiektu nowego przejazdu, active boolean, full boolean, passengers array dla dni, które wybrał użytkownik
  - [x] Dodać modal z wyborem dni na screenie przejazdu
  - [x] Uzupełnić filtrowanie o zajęte przejazdy
  - [X] Dodać pasażerów na screenie właściciela przejazdu
  - [X] Dodać wyświetlanie dni na ktore zapisał sie user
- [x] Dobieranie dostępnych przejazdów dla użytkownika na podstawie lokalizacji (teraz mamy tylko dni i godziny)
- [X] Dodać powiadomienia

# Expo Router Example

Use [`expo-router`](https://docs.expo.dev/router/introduction/) to build native navigation using files in the `app/` directory.

## 🔨 How to install

```sh
git clone https://github.com/konrad-skowron/car-sharing-tinder.git
cd car-sharing-tinder
npm i
npm start
```

then press **A** to launch android emulator, or **W** for web

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://docs.expo.dev/router/introduction/)
