## Update the schema.graphql file

First, download and run the API project.

Go to

`http://localhost:8080/graphql`

and press "Schema" on the right. Download it in SDL format, and move the downloaded file to override the file in `./data/schema.graphql`

## Get an authentication token

Run

`cp .env.example .env`

Go to the playground for the API at
`http://localhost:8080/graphql`

and run

```
mutation{
  login(loginData:{username:"Rosalyn", password:"Hobbs"})
}
```

Save the resulting JWT in the `REACT_APP_AUTH` variable

## Run the project

Run

`yarn start`

and go to

`http://localhost:3000/`
