Food Delivery System
====================

> Hobby development application builds intended for User, Restaurant, Delivery Team and Admin to manage food delivery process.

Getting Started
===============
1. Clone the sourcecode with Git:   
```sh
$ git clone https://github.com/CodesAreHonest/food-delivery-system.git
```

2. Change Directory into the Folder and install all the required packages with Composer.   
```sh
$ cd food-delivery-system/
$ composer install
```

3. Install *cross-env* package with npm to run scripts and use environment variables across platforms.     
```sh
$ npm install --save-dev cross-env
```

4. Install all the required packages with npm.     
```sh
$ npm install
```

5. Compile the assets of React (JSX, ES6, SASS) into ES5 with Laravel Mix, Babel and Webpack.
```sh
$ npm run dev
```

6. Import database and tables with *food_delivery.sql* under **/storage/query/** directory.

7. Configure the *.env* file
```sh
$ cp .env.example .env
```

8. Set the application key for Laravel 
```sh
$ php artisan key generate
```

9. Serve the application on port 8000, you will see following output once the serve is succes. 
```sh
$ php artisan serve
Laravel development server started: <http://127.0.0.1:8000>
```