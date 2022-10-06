
<div align="center"><img style = "width:100%;"src="https://i.imgur.com/BhN3Pll.png"></img></div>
<hr>
<h2 align=center>Approved (authoring project)</h2>
<h3 align=center>Web development Project</h3>
<hr>
<h4 align=center>Have you ever gotten lost trying to organize yourself when studying?</h4>
<h4 align=center>Approved is a study planning application</h4>

<hr>

## In it you can:

- Group material and topics by folders;
- Create a weekly study planner
- Save the contents studied on the day
- Mark topics as complete
- Schedule topic review

---

## :computer: Technologies and Concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- postgresql
- Prism
- Jest
- Heroku

---

## :rocket: Deploy

- [Deploy on Heroku (backend)](https://approved-back.herokuapp.com)
- [Deploy on Vercel (front-end)](https://approved-front.vercel.app/)

---

## :rocket: Routes

### Authentication routes

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "name": "loremipsum"
}
```
```yml
POST /sign-in
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
```

### Folder routes

```yml
POST /folder (authenticated)
    - Route to create study folder
    - headers: {"Authorization": "Bearer $token" }
    - body: {
        "name": "Folder name"
}
```
```yml
GET /folder (authenticated)
    - Route to list user folders
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml
GET /folder/:id (authenticated)
    - Route to list folder (by id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml
DELETE /folder/:id (authenticated)
    - Route to delete folder (by id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

### Material routes

```yml
POST /subject (authenticated)
    - Route to create matter
    - headers: {"Authorization": "Bearer $token" }
    - body: {
        "name": "Subject name",
        "folderId": <folder id (Int)>,
        "isDone": boolean
}
```
```yml
DELETE /subject/:id (authenticated)
    - Route to delete matter (by id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
### Topic routes
```yml
POST /topic (authenticated)
    - Route to create matter
    - headers: {"Authorization": "Bearer $token" }
    - body: {
        "name": "Subject name",
        "folderId": <folder id (Int)>,
        "subjectId": <subject id (Int)>
        "isDone": boolean
}
```
```yml
POST /topic/:id (authenticated)
    - Route to complete topic
    - headers: {"Authorization": "Bearer $token" }
    - body: {}
```
```yml
DELETE /topic/:id (authenticated)
    - Route to delete matter (by id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

### Study routes

```yml
POST /study (authenticated)
    - Route to create matter
    - headers: {"Authorization": "Bearer $token" }
    - body: {
        "folderId": <folder id (Int)>,
        "subjectId": <subject id (Int)>,
        "topicId": <topic id (Int)>
}
```
```yml
GET /study/:id (authenticated)
    - Route to list all studies in a folder by their id
    - headers: {"Authorization": "Bearer $token" }
    - body: {}
```
```yml
DELETE /study/:id (authenticated)
    - Route to delete study (by id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

### Planner routes

```yml
POST /planner (authenticated)
    - Route to create planner
    - headers: {"Authorization": "Bearer $token" }
    - body: {
        "folderId": <folder id (Int)>,
        "subjectId": <subject id (Int)>,
        "topicId": <topic id (Int)>,
        "weekDay": <day of the week (Int, 0=Sunday)>
}
```
```yml
GET /planner/:id (authenticated)
    - Route to list all planner in a folder by their id
    - headers: {"Authorization": "Bearer $token" }
    - body: {}
```
```yml
GET /planner (authenticated)
    - Route to list all planner of a user by their token
    - headers: {"Authorization": "Bearer $token" }
    - body: {}
```
```yml
DELETE /planner/:id (authenticated)
    - Route to delete planners (by id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

### Revision routes

```yml
POST /review (authenticated)
    - Route to create review
    - headers: {"Authorization": "Bearer $token" }
    - body: {
        "folderId": <folder id (Int)>,
        "subjectId": <subject id (Int)>,
        "topicId": <topic id (Int)>,
        "date": <date DD/MM/YYYY>
}
```
```yml
GET /review (authenticated)
    - Route to list all revisions of a user by their token
    - headers: {"Authorization": "Bearer $token" }
    - body: {}
```
```yml
DELETE /review/:id (authenticated)
    - Route to delete revision (by id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Running the application

Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/DanielCdOliveira/approved-back.git
```
or
```
git clone git@github.com:DanielCdOliveira/approved-back.git
```

## Backend


```
npm install
```

Once the process is finished, just start the server:

> To upload the application to the development environment:

```
npm run dev
```

> To upload the integration testing application:

- it is necessary to create a **.env.test** file to run this command

```
npm run test
```

> To upload the unit tests application:

- it is necessary to create a **.env.test** file to run this command

```
npm run test:unit
```

> To upload the application for testing with cypress(front-end):

- it is necessary to create a **.env.test** file to run this command

```
npm run dev:test
```

> To run the project build with typescript:

```
npm run build
```

> To upload the application after the build:

```
npm run start
```

## Front end



## Access the back-end repository[ here](https://github.com/DanielCdOliveira/approved-back)

## Thunder client

- For manual tests it is possible to import the file **thunder-collection_approved.json**
