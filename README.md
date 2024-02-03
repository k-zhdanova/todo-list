# TO-DO list

[See the LIVE version](https://k-zhdanova.github.io/todo-list/) 


1. **Development**

	To run the project locally, navigate to the project directory.\
	First, install all the dependencies:

```bash
yarn install
```
    
Then, run the project:
    
```bash
yarn start
```

Open [http://localhost:3003](http://localhost:3003) to view it in the browser.


2. **Usage:**

  	The TO-DO list offers the following features:

 - Create, edit, and delete tasks.
 - Mark tasks as complete or incomplete (both in edit mode and by clicking on the checkbox).
 - Reorder the existing list with drag-and-drop functionality.
 - Filter the list by status and category.
 - Automatically move completed tasks to the bottom of the list, marking them as completed.
 - Persist tasks using IndexedDB to prevent loss after refreshing the page.
