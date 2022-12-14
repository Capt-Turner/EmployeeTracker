# Employee Tracker

Welcome to the Employee Tracker. This command-line app allows for non-developers to view and interact with buisness information stored in an SQL database. With this app, users are able to view and edit stored data including names of employees and who they report to, roles and their salaries, and the departments within the buisness. 

## How to Use

After a little setup, this app is very user-friendly and easy to learn.

> Step 1: Download this repo to your device.
>
> Step 2: Replace the SQL login data in db/connection.js to your/the users login credentials to SQL
>
> Step 3: Open the terminal and run `npm i`
>
> Step 4: Log into a MySQL terminal and run `SOURCE db/schema.sql`
>
> Step 4.5: If you want to use the provided seeding data for testing, run `SOURCE db/seed.sql` in the MySQL terminal
>
> Step 5: Run `npm start` from the first terminal

Now that it's been installed and running various action will be available in the command line. Provided is a small sample seed, however this is not required as all data in the database can be written and edited in-app. To get an in-depth view of all the possible actions, refer to this [walkthrough video](https://drive.google.com/file/d/1X_g6hzTqxBQxiVvvdnFMXwNFjm-85TPW/view)

## Screenshots

![Example of terminal at launch](/readme_assets/Launch_Screen.png)

![Example of viewing the stored database](/readme_assets/Viewing_Database.png)

### Tools

This app uses the following tools:

- [Inquirer](https://www.npmjs.com/package/inquirer)
- [MySQL](https://www.mysql.com/)

### Future Development

I consider this project complete, however I do feel there are things that could be added on at a later date.

- Some kind of logo to place at launch to boost UI appeal
- Go a level up where users can store muiltiple different buisnesses with independent departments, roles, and employees