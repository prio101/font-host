### Font Group System:
---


This is a project created with OOP PHP to provide the font group system for the website. The project is designed to be modular and easy to use, allowing developers to easily integrate it into their own projects.


### Scripts:

1. Run the built in server:
```bash
php -S localhost:8000 backend/index.php

```

2. Run the migration
```bash
vendor/bin/phinx migrate
```

3. create a new migration
```bash
vendor/bin/phinx create CreateFontGroup
```


### Routes Collection

Check the routes collection in the `backend/index.php` file. The routes are defined using the Bramus router, and you can add your own routes as needed. The routes are organized into groups, making it easy to manage and maintain them.

### Database Configuration

The database configuration is located in the `backend/config/database.php` file. You can change the database connection settings to match your own environment. The project uses PDO for database access, making it easy to switch between different database systems if needed.

