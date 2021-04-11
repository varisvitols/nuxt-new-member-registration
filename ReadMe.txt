To run the project, please follow these steps:
1. Extract archive
2. Open terminal
3. Navigate to the directory where package.json file is located
4. Execute command 'npm install' to install all project dependencies
5. Execute command 'npm run dev' to launch the local development server
6. Open link http://localhost:3000/ in your browser to run the application
7. You will find all submitted form data here: https://httpreq.com/square-pond-9x2rp5wl

Some technical notes:
Project is running on current version of Nuxt with TypeScript.
This is first time I'm using Nuxt in any of my work, so please, take it easy on me! :)
Using SASS for CSS processing. I'm using BEM methodology for naming CSS classes, wherever applicable.
I think it's a good way to make the markup and CSS structure look and feel more organized.
Read more about it here: http://getbem.com/introduction/
Vuex (built-in store) is used for data storage.
Perhaps LocalStorage would have been a better idea for data retention over page refreshes,
but Vuex was available and I gave it a shot.