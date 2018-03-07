# compose-mongodb-helloworld-nodejs Overview

compose-mongodb-helloworld-nodejs is a sample IBM Cloud application that shows you how to connect to an IBM Compose for MongoDB for IBM Cloud service using Node.js.

## Running the app on IBM Cloud

1. If you do not already have an IBM Cloud account, [sign up here][IBMCloud_signup_url]

2. [Download and install IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/bluemix_cli/download_cli.html).

  The IBM Cloud CLI tool tool is what you'll use to communicate with IBM Cloud from your terminal or command line.

3. Connect to IBM Cloud in the command line tool and follow the prompts to log in.

  ```
  bx login
  ```

  **Note:** If you have a federated user ID, use the `bx login --sso` command to log in with your single sign on ID.

4. Make sure you are targetting the correct IBM Cloud org and space.

  ```
  bx target --cf
  ```

  Choose from the options provided. If you have already created the service, use the same options here as you used when creating the service.

5. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/IBM-Cloud/compose-mongodb-helloworld-nodejs.git
  ```

6. `cd` into this newly created directory

7. Update the `manifest.yml` file.

  - Change the `host` value to something unique. The host you choose will determinate the subdomain of your application's URL:  `<host>.mybluemix.net`.
  - Change the `name` value. The value you choose will be the name of the app as it appears in your IBM Cloud dashboard.

  If you have already created a Compose for MongoDB service in IBM Cloud, update the `service` value in `manifest.yml` to match the name of your service. If you don't already have a Compose for MongoDB service in IBM Cloud, you can create one now using the `create-service` command.

  - **Note :** The Compose for MongoDB service does not offer a free plan. For details of pricing, see the _Pricing Plans_ section of the [Compose for MongoDB service][compose_for_mongodb_url] in IBM Cloud.

  - You will need to specify the service plan that your service will use, which can be _Standard_ or _Enterprise_. This readme file assumes that you will use the _Standard_ plan. To use the _Enterprise_ plan you will need to create an instance of the Compose Enterprise service first. Compose Enterprise is a service which provides a private isolated cluster for your Compose databases. For information on Compose Enterprise and how to provision your app into a Compose Enterprise cluster, see the [Compose Enterprise for IBM Cloud help](https://console.ng.bluemix.net/docs/services/ComposeEnterprise/index.html).

  To create your service:

  ```
  bx cf create-service compose-for-mongodb Standard my-compose-for-mongodb-service
  ```

8. Push the app to IBM Cloud. When you push the app it will automatically be bound to the service.

  ```
  bx cf push
  ```

Your application is now running at `<host>.mybluemix.net`.

The node-mongodb-helloworld app displays the contents of an _examples_ database. To demonstrate that the app is connected to your service, add some words to the database. The words are displayed as you add them, with the most recently added words displayed first.

## Code Structure

| File | Description |
| ---- | ----------- |
|[**server.js**](server.js)|Establishes a connection to the MongoDB database using credentials from VCAP_ENV and handles create and read operations on the database. |
|[**main.js**](public/javascripts/main.js)|Handles user input for a PUT command and parses the results of a GET command to output the contents of the MongoDB database.|

The app uses a PUT and a GET operation:

- PUT
  - takes user input from [main.js](public/javascript/main.js)
  - uses the `db.collection.insertOne()` method to add the user input to the database

- GET
  - uses `db.collection.find()` method to retrieve the contents of the _words_ collection
  - returns the response of the database command to [main.js](public/javascript/main.js)

## Privacy Notice
The compose-mongodb-helloworld-nodejs sample web application includes code to track deployments to IBM Cloud and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/cloudant-labs/deployment-tracker) service on each deployment:

* Application Name (application_name)
* Space ID (space_id)
* Application Version (application_version)
* Application URIs (application_uris)

This data is collected from the VCAP_APPLICATION environment variable in IBM Cloud and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Cloud. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### Disabling Deployment Tracking

Deployment tracking can be disabled by removing `require("cf-deployment-tracker-client").track();` from the beginning of the `server.js` file.

[compose_for_mongodb_url]: https://console.ng.bluemix.net/catalog/services/compose-for-mongodb/
[IBMCloud_signup_url]: https://ibm.biz/compose-for-mongodb-signup
[cloud_foundry_url]: https://github.com/cloudfoundry/cli
