# Frontend Bundler

The frontend bundler is an extremely un-opinionated HTML/CSS/JS bundler to create hybrid single page applications.

## Why?

The idea of the frontend bundler is to leverage the idea of an SPA without using a complete framework. Write your code in HTML, CSS and JavaScript. Then bundle it all together into a single file for efficiency. Once on a page, there is no need to make further requests for more HMTL, CSS or JavaScript. The user recieves all of the code, then the code only needs to make requests to the backend for data. This leaves the onus on the developer to modularize, organize, and write clean code in whatever way he/she sees fit.
Since creating a single massive file for an entire website would be inefficient, the idea is to create many smaller SPA's. Perhaps one SPA for a landing page, another for the help section of a website and another for the user dashboard/tools. That option is left up to the developer to decide.