#CREATE DATABASE hamster;

# Create matching mysql user for development:
CREATE USER 'app'@'localhost' IDENTIFIED BY 'hr23thesis';
GRANT ALL ON hamster.* TO 'app'@'localhost';

# TODO: tighten mysql user permissions to necessary only
