# E-Commerce-Back-End
![badge](https://img.shields.io/badge/license-MIT-orange)

## Description
This task required me to build the back end for an e-commerce site by modifying starter code. I configured a working Express.js API to use Sequelize to interact with a MySQL database. I needed to use the MySQL2 and Sequelize packages to connect my Express.js API to a MySQL database and the dotenv package to use environment variables to store sensitive data.

#
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Demo](#demo)
* [License](#license)
* [Contact Information](#contact-information)
#

## User Story
```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria
```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Installation
- Clone or Dowload as a zip file via Github
- In the command line, enter "npm install inquirer" and "npm install mysql" if not done already.
#

## Usage
- In the command line enter "mysql -uroot -p" and put in that password.
- Next, enter "source ./db/schema.sql;" and then "quit".
- Lastly, put in "node seeds" to seed the data.
- Simply enter "npm start" to execute file in the command line.
- Run all get, post, put and delete routes in Insomnia for tags, categories, and products.
#

## Demo
Click [here](https://drive.google.com/file/d/1OqVQKYOC2mii4sJVRm9EOTK7P89JQy9J/view) for the demo video.
#
## License 
![badge](https://img.shields.io/badge/license-MIT-orange) 
#

## Contact Information

GitHub User: navaulakh24

GitHub repo: [Employee-Tracker](https://github.com/navaulakh24/E-Commerce-Back-End)

Email: navdeep_aulakh24@hotmail.com
