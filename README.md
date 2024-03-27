# React Constinuation Exam

## Installation & other instructions

### Installation:

```bash
npm install
```

### Where to paste API url:

```bash
src/API/APIServives.js
```

```javascript
const BASE_URL = "https://crudcrud.com/api/[your API code]";
```

and

```bash
package.json
```

```javascript
  "proxy": "https://crudcrud.com/api/[your API code]",
```

## Description

This is a simple workout loggin application that lets you store and manage your workout sessions via the crudcrud API. The interface is built around a simple calendar that lets you see and manage your workout data, hopefully in a simple and intuitive way.

Users can also see their total amout of registered workouts, wether or not they met their weekly attendance goal, and build their weekly attendance streak.

## Personal Evaluation

### Ideation & Process

I started out with a basic layout of the app. I attempted to adapt to the "Atomic Pattern". There is much room for improvement, both in implementation and understanding, but unfortunately I ran out of time.

Initially, I wanted this to be a multipage app using react-router-dom. I wanted to use a calendar, as I have implemented, that could be accessed in a global modal setup using React's Context API. However, my state management and component structure was poorly planned, and an unnecessary amount of time was spent on debugging this before reverting to a simpler solution. Unfortunately, I repeated this mistake more than once, and lost time to debugging poorly though out solutions. I spent hours trying to implement features (i.e global modal) that aren't used in the submitted project. The big takeaway is to design the app more properly at the outset and never underestimate the scope of seemingly simple tasks.

### Known issues:

- The modal does not update as intended when deleting exercises, or when adding new muscle groups. These modals are meant to "go back" to the main modal after submission or cancellation, but instead, both modals are closed. A simpler implementation could easily have solved this.
