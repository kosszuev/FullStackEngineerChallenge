I used "VueJS" and "Tailwind CSS" to create this project.

There are 2 modes: Employee and Admin. You can switch between them, using tabs on the right top corner of the screen.

![Employee and Admin modes](src/assets/images/screen_1.png)

### Employee Mode

Using Employee mode, you can access any profile of existing employees.

On the profile page of an employee, you can see a list of review requests, assigned to this particular employee if any.
![list of review requests](src/assets/images/screen_2.png)

Employee can access any review request pages, he/she is assigned to and leave a comment on that review request.
![Comments on review request page](src/assets/images/screen_3.png)

### Admin Mode

In Admin mode you have 2 tabs: Employees and Performance Reviews
Using Admin mode, you can access, create, update, delete account of any existing employee.

![Employees list Admin view](src/assets/images/screen_4.png)

Employee account contents avatar(I used firebase for storing images)
![Employees Create page](src/assets/images/screen_9.png)

Admin also can create, edit see the content of any request. When reviewers are assigned, their avatars are displayed on the request card.
![Review request list Admin view](src/assets/images/screen_5.png)

When Admin creates a new review request, he/she can assign anybody from existing employees, by selecting by first names.

![Review create page](src/assets/images/screen_6.png)

Selected employees are displayed under input field.

![Review create selected employees](src/assets/images/screen_7.png)

There is a notification in the right top corner each time Admin creates, edits employee or request.

![Review create selected employees](src/assets/images/screen_8.png)

### Further improvements

Due to time constraints the Backend wasn't implemented. I used "json server" RESTful API instead of making a full backend server.

My further improvement regarding this project are:

- Implementing Ruby on Rails RESTful API with a MySQL database for the Backend.
- Implementing Axios library as the HTTP client, in order to perform GET, POST, PUT and DELETE operations to the Backend.
- Implementing Vuex for state management on the Frontend.

## Project setup

Run the follow commands

```
npm install

npm run serve

json-server --watch db/db.json
```
