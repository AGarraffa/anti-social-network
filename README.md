# 
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

## Table of Contents
[Description](#description)

[Installation](#installation)

[Usage](#usage)

[Screenshots](#screenshots)

[Credits](#credits)

[Dependencies and Libraries](#dependencies-and-libraries)

[Contact Information](#contact-information)

---


## Description
This is just a basic api build for a simple social network app.
                
---     
## Installation
Navigate to your chosen directory in the terminal and type:
```
git clone git@github.com:AGarraffa/anti-social-network.git
```

After the repository is cloned, within the directory, type:
```
npm i
npm run seed
npm start
```

This will install all dependencies and seed the data with sample data (note: only users are generated. Thopughts and reacions will need to be added manually).

---
## Usage
Using your preferred api testing tool you can test the routes (see the ./api directory for the end paths). The formatting for posts and puts are as follows:
```
Users
{
    "userName": ,
    "email": 
}

Thoughts
{
    "text": ,
    "userId":
}

Reactions
{
    "reactionBody": ,
    "userName": 
}
```
A video demonstrating the user routes can be found here: https://drive.google.com/file/d/1nQLjDpW7OVya3HemH4OuDdfLRl6-D_W_/view
    
A video demonstrating the thought routes can be found here: https://drive.google.com/file/d/14jszDVFOLWBT-GF4rLpsx0izTwd6dTEG/view

---
## Credits
* Alfred Garraffa


---
## Dependencies and Libraries
* Node.js
* Express
* Mongoose

---
## Contact Information
agarraffa@gmail.com

http://github.com/AGarraffa



        
        
<sub><sub>this file was created usings Alfred Garraffa's Readme generator</sup></sub>