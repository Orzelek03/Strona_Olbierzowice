# ⛪ System Zarządzania Parafią (Lokalna Wersja)

Lokalna aplikacja webowa stworzona na potrzeby parafii, łącząca publiczny portal informacyjny z zabezpieczonym panelem administracyjnym. Projekt opiera się na architekturze SPA z wykorzystaniem Inertia.js.

---

## 🚀 Główne Funkcje

* **Portal Informacyjny (Strona Publiczna):**
  * Strona główna z aktualnościami i dynamicznym ładowaniem treści.
  * Sekcja aktualności/postów z powiązanymi galeriami zdjęć.
  * Ogłoszenia duszpasterskie (podział na Olbierzowice, Nawodzice) oraz katechezy.
  * Harmonogram intencji mszalnych sortowany po dacie i godzinie.
  * Interaktywna galeria zdjęć z widokiem albumów.
  * Historia parafii oraz zakładka kontaktowa.

* **Panel Administracyjny (`/admin`):**
  * Chroniony system autoryzacji z dedykowanym przekierowaniem.
  * Pulpit zarządzania (Dashboard) z kafelkami szybkiego dostępu.
  * Pełne zarządzanie CRUD dla: Albumów, Postów, Intencji oraz Ogłoszeń.
  * Automatyczne zarządzanie plikami (tworzenie unikalnych podfolderów dla albumów).

---

## 🛠️ Stos Technologiczny

* **Backend:** PHP 8.2+, Laravel
* **Frontend:** React, TypeScript, Inertia.js, Tailwind CSS
* **Baza danych:** MySQL
* **Środowisko:** Docker & Laravel Sail

---

## ⚙️ Wymagania Wstępne

Upewnij się, że masz zainstalowane:
* Docker oraz Docker Desktop
* Git

---

Markdown
# ⛪ Parish Management System (Local Development)

A local development setup for a parish management application built with Laravel, React (Inertia.js), and Tailwind CSS.

## 🚀 Key Features

- **Information Portal (Public Page):**
  * Homepage with latest news and dynamic content loading.
  * News/posts section with attached photo galleries.
  * Parish announcements (categorized by location: Olbierzowice, Nawodzice) and catechesis sessions.
  * Mass intentions schedule sorted by date and time.
  * Interactive photo gallery with album views.
  * Parish history and contact page.

- **Administrative Panel (`/admin`):**
  * Protected authentication system with a dedicated redirection.
  * Management dashboard with quick-access cards.
  * Full CRUD management for: Albums, Posts, Intentions, and Announcements.
  * Automated file management (creating unique subfolders for albums).

---

## 🛠️ Tech Stack
* **Backend:** PHP 8.2+, Laravel
* **Frontend:** React, TypeScript, Inertia.js, Tailwind CSS
* **Database:** MySQL
* **Environment:** Docker & Laravel Sail

---

## ⚙️ Prerequisites
Make sure you have the following installed on your local machine:
* Docker & Docker Desktop
* Git

---
