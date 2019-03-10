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

Highlight
=========

Software Resources
------------------

1. React v16.7.0
2. Redux v6.0.0
3. ReactStrap (React's Bootstrap) v7.1.0
4. SASS 
5. Laravel
6. Laravel Mix
6. AWS RDS
7. MySQL Database 10.1-36
8. Apache Web Server
9. Webpack 4

Features
--------
**1. User Site**  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1 Authentication   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1.1 Login   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1.2 Register   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2 Food Menu Display with **Advanced Filtering and Search**   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.3 Shopping Cart   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.4 Order Check Out    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.5 Food Order Tracking with **Advanced Filtering and Search**   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.6 Profile Management   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.6.1 Location Information   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.6.2 Edit Profile    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.6.3 Credit Card Management       
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.7 Delivery Tracking and Acceptance    

**2. Restaurant Site**  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1 Authentication   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1.1 Login   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1.2 Register   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.2 Add Food   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3 Edit Food  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.4 Delete Food    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.5 Edit Profile   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.6 Profile Management    

**3. Delivery Site**  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1 Authentication   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1.1 Login   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1.2 Register   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2 Delivery Management   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.1 Accept Order   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.3 Edit Profile    

**4. Admin Site**  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1 Authentication   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1.1 Login   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1.2 Register   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2 Monitoring Features with **Filtering and Search**   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2.1 Food Orders Monitoring   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2.2 Members Monitoring   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2.3 Delivery Progress Monitoring    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3 Admins Management   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4 Profile Management   

About 
===== 
Contributor  
------------
- **Chai Ying Hua** 
