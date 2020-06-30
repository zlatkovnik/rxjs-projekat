# RWA projekti

## 1. Vanilla + rxjs

#### Pokretanje:

```
npm run dev
```
  Time se pokreće webpack, webpack dev server i json server.
  
#### Pregled:

Postoje 5 stranice. 
 - Prva je home gde se smenjuju likovi iz baze na par sekundi.
 - Druga je create gde se pravi novi lik koji se ubacuje u bazu.
 - Treća je select gde se bira lik za borbu ili kupovinu.
 - Nakon odabira lika otključava se nova stranica gde se odvija borba.
 - Otključava se takođe i strana za kupovinu opreme koja menja atribute odabranog lika.
  
#### Instrukcije:

  U borbi je bitno da što pre pritisne dugme za napad nakon protivničkog napada, kako bi se sačuvao život našeg lika.
  
  
## 2. Angular + ngrx

#### Pokretanje:

```
ng serve -o
json-server db.json
```
  Pokreće se angular dev server (otvara se tab) i json server.
  
#### Pregled:

Postoje stranice.
  - Prva je home stranica, gde se nalazi dugme za odlazak na postove. A u slučaju da korisnik nije prijavljen takođe i dugme koje vodi na formu za registraciju.
  - Forma za registraciju
  - Forma za prijavu
  - Stranica sa postovima, podeljena u stranice sa po 5 postova.
  - Klikom na komentare, ulazi se u komentare posta.
  - Klikom na nečiji ili svoj profil odlazi se na više informacija o korisniku
  - U slučaju da je profil naš postoji i forma za izmenu
  
#### Mogućnosti:
  - Registracija
  - Logovanje
  - Pregled postova
  - Dodavanje novog posta
  - Lajkovanje postova (ta akcija menja karmu korisnika, sem u slučaju kada lajkujemo svoj post)
  - Promena stranice
  - Odlazak na komentare posta
  - Listanje i ostavljanje komentara
  - Brisanje svojih komentara
  - Brisanje svojih postova
  - Odlazak na nečiji profil
  - Izmena profilne slike na profilu

Nikola Zlatkov, 16593
