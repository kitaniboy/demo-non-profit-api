# Al Rahma API

The main API for Al Rahma Admin dashboard

This node js project handles all serverside related activities for the over all project.

Can be accessed fronm a frontend application to:

- Creating JWT tokens
- Connecting all application data to a mongoDB database (family data, family members data, etc.)
- Perform CRUD activities

## Gettong Started

1. Fork the project

2. Clone the forked repository to your local machine

3. Navigate to project directory and install dependencies via `npm install`

4. Run mongoDB (see [link](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/) for installing and running guide)

5. Create a .env file in the root directory and add the following to it: `MONGODB_URL=YOUR_MONGODB_URL`

6. Start the project by running the following command `npm run dev`

7. Start your frontend application and connect to the api using the appropriate url (by default it is localhost:5000)


## Contribution

See [CONTRIBUTING.md](https://gitlab.com/estore-oman/al-rahme-api/blob/master/CONTRIBUTING.md)

### NOTE:

perform  `npm audit` before deploy

In production run `service al-rahma-api restart` to restart the api service.