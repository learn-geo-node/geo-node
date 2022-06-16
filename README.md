# geo-node

# NodeJS App Setup

```
    - reading and writing to file
    - reading and writing to sqlite database
    - turning structured object into JSON
    - parsing a JSON into object
    - basic CLI that can parse args, flags and can print to stdout
    - sending http request
    - implementing a basic web server
    - writing a unit test
```

(model C4, ADR)

**Docsy endpointów w SWAGGER (maybe** [https://www.npmjs.com/package/swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express))

CEL: Apka, która zawiera auth/login. Po rejestracji/zalogowaniu użytkownik zostaje przeniesiony na stronę, na której znajduje się przycisk (GET GEOLOCATION DATA). Po kliknięciu następuje strzał do 3rd party (ipstack.com) po dany dot. geolokacji IP adresu usera. API zwraca aktualne dane o geolokacji. Apka przechowuje dane historyczne o geolokacji ( w db ).

ROLE: Zwykły USER oraz ADMIN

1. LOGOWANIE/REJESTRACJA
- korzystamy z JWT zapisywanych Client Side (później rozwijamy o OAuth) + refresh token
- notyfikacje/przypomnienie hasła na maila
- wysyłanie wiadomości z potwierdzeniem aktywacji konta
- 2FA generowany po zalogowaniu (uuid...) (unikalny, niezmienialny, zapomnisz, jesteś w dupie)
- CLI, przypisujący konto do roli admina

2. PROFIL
- re/upload/delete zdjęcia
- zmiana maila/hasła
- zmiana danych

3. GEOLOKACJA
- filtrowanie/sortowanie
- połączenie z 3rd party (ipstack.com)
- zapisywanie danych o geolokacji do pg db (również dane historyczne) w formie json (później csv/pdf...) **Jak przechowywać dane otrzymane z API?**
- wstępnie z node, potem serverless

4. Zakładka USERS
- ADMIN ma możliwość zobaczenia listy użytkowników/usunięcia
