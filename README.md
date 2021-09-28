# Server

Node.js server for Schlagardy. Express server. Sequelize to query postgres. Redis for key-value storage. JSON Web Tokens for Auth. Yup for validation.

## Setup
```bash
# starts postgres service for development
npm run setup
```

## Start Dev Server
```bash
npm run dev
```

## Redis
```bash
# install on wsl
sudo apt-get install redis
# start redis server
sudo service redis-server stat
# connect to redis cli, terminal running command above (redis-server) needs to stay open to server alive
redis-cli
```

## Postgres WSL Install
```bash
# Create the file repository configuration:
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key:
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package lists:
sudo apt-get update

# Install the latest version of PostgreSQL.
sudo apt-get -y install postgresql
```

## Postgres Testing
```bash
# start the service
sudo service postgresql start
# make default user "postgres" have password "postgres"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
# sign into user "postgres" on local host
psql -U postgres -h localhost
# create new database
CREATE DATABASE awadreddit;
# list the databases to verify creation
\l
# quit postgres
\q
```