# Al Rahma API

The main API for Al Rahma Admin dashboard

## Contribution

After making changes to any file in this project, follow these steps to get it
updated on the remote repository on GitLab

1- Update the version

for small patches (ex: misspelled something):

```
npm version patch
```

for minor updates (ex: Added a new Column to our table):

```
npm version patch
```

for major updates (ex: added Sign in and Log in):

```
npm version patch
```

2- Push to remote repository

check the status to know which files you will be commiting

```
git status
```

add the files that you need to commit

```
git add example.js
```

or add all files that were changed with one command

```
git add .
```

Next commit your changes and write a descriptive message

```
git commit -m "A very descriptive command that is related to the commit"
```

Finally push to remote repo

```
git push
```

## Installing dependencies

To install dependencies use the following command:

```
npm i -S <Package name>
```

in the case of a dev dependency then run:

```
npm i -D <Package name>
```
