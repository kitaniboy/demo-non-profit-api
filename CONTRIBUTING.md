# Contributing

To contribute to this private project you need to have permission given by the
project owner. Currently that is @estore-oman

Table of contents
=================

<!--ts-->
   * [Fork the project](#fork-the-project)
   * [Clone the project](#clone-the-project)
   * [Make changes](#make-changes)
      * [Installing dependencies](#installing-dependencies)
   * [Change the version](#change-the-version)
   * [push to your fork](#push-to-your-fork)
   * [Create a pull request](#create-a-pull-request)
<!--te-->

Fork the project
=================

This allows you to create a personal copy of the project


Clone the project
=================

Simply type the following on your terminal

```
git clone https://<YOUR-USER-NAME>:<YOUR-PASSWORD>@gitlab.com/Ma7eer/al-rahme-api.git
```

Make changes
=================

Changes include any change to the code or documentation

Installing dependencies
-------------------------

To install dependencies use the following command:

```
npm i -S <Package name>
```

in the case of a dev dependency then run:

```
npm i -D <Package name>
```


Change the version
=================

This can be done by running the following commands:

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

PLEASE NOTE that this should be done if and only if you are making changes to the code. DO NOT
change the version when making changes to documentation or other files that
won't affect the application directly.

push to your fork
=================

Simply type the following:

```
git push
```

Depending on your configuration you make be prompted to add your username and
password. Simply enter them and you should be able to push to your fork.

Create a pull request
=================

If you go check your forked repositories page you will notice that you are
prompted to create a pull request. Through the prompt you can create a pull
request. It is highly encouraged that your pull request is associated with any
additional comments or clarifications about the changes you made.
