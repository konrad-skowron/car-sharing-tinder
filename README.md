## :construction_worker: Todo
- [X] Usunąć car details z `user/about` screen 
- [X] Usunąć/Pomyśleć coś z postcode zwracanym z API (nie każda lokalizacja posiada postcode co powoduje błąd przy zapisie do bazy danych)
- [X] Poprawić screen z wybieraniem i zapisywaniem godziny. Nie wyświetla zera gdy liczba minut jest jednocyfrowa. Powinno byc np. 23:05 a jest 23:5
- [ ] Pomyśleć coś z wyświetlaniem adresów bo poki co wyświetlamy address_line1. Czasami ta nazwa nic nie mówi a czasami jest tak długa, że się nie mieści
- [X] Dodać screen edycji usera - żeby mógł dodać opis about me i zmienić nazwę swoją nazwę, numer, zdjęcie
- [ ] Rozszerzyć screen edycji usera o przesyłanie zdjęcia (jestem w trakcie - Konrad)
- [ ] Ściągać dane z serwera zawsze jak się wejdzie do home, nie tylko gdy przejdzie logowanie
- [X] Odfiltrować na home tylko przejazdy posiadające samochód
- [ ] Matchowanie użytkowników:
  - [ ] Dodać nowego pola do obiektu użytkownika. Nazwa pola `matched`, typ pola array. Tablica będzie przechowywała uid przejazdów jakie zmatchował użytkownik
  - [ ] Dodać logikę związaną z dodawaniem i usuwaniem uid przejazdu do tej tablicy
  - [ ] Dodać nowe pole dla przejadów z samochodem, aby właściciel przejazdu wiedział o pasażerach. Nazwa pola `passengers`, typ pola array. Tablica będzie przechowywała uid użytkowników, którzy zmatchowali ten przejazd
  - [ ] Dodać logikę związaną z dodawaniem i usuwaniem uid użytkownika do tej tablicy
- [ ] Przenieść ponownie dodawanie przejazdu ze screena `success` na `carDetail`. Dodanie przejazdu działo się zanim ustawił się obiekt carDetails, przez co nie dało się ustawić samochodu dla przejazdu
- [ ] Dodać mapę z wyznaczoną trasą do screena przejazdu (`[id].jsx`)
     

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
