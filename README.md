# Data-Base-Course-Project (2021)

```
3rd course, IU7
Bauman Moscow State Technical University
```

## Описание

Сайт по функционалу схож с Пикабу или Вконтакте, содержит ленту постов, в которых могут быть текст, изображения и теги. Имеется возможность создавать, просматривать, комментировать и оценивать посты. Также реализована регистрация на сайте.

## Технологический стек

**Back-end**:  TypeScript/Express/Node-postgres

**Front-end**: React.js

**Data base**: PostgreSQL

## Ролевая система

* **Гость** - имеет ряд ограничений по функционалу и может только просматривать записи;

* **Авторизованный пользователь** - может создавать, оценивать и комментировать записи.

* **Администратор** - король на сайте, кроме возможностей обычного пользователя, может удалять посты и комментарии. Крутой, одним словом!

## Скриншотики

Начальная страница аутентификации

![аутентификация](https://github.com/shlyapos/bmstu_db_proj/blob/main/Documents/screenshot_1.png)

Главная страница с лентой постов, обычный пользователь

![лента новостей](https://github.com/shlyapos/bmstu_db_proj/blob/main/Documents/screenshot_2.png)

Лента новостей у администратора. Имеет крестики у постов и комментариев для их удаления

![](https://github.com/shlyapos/bmstu_db_proj/blob/main/Documents/screenshot_3.png)
