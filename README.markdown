angular-java-server-midi
========================

This is an example project for bulding [Angular](http://angularjs.org/) applications
with a Java server using Maven.

**Note!** This project is using a slightly patched version of angular.js, see
[this thread](http://groups.google.com/group/angular/browse_thread/thread/d80617f2d8e9255c)
on the Angular mailing list. Also, have a look at the
[pull request](https://github.com/angular/angular.js/pull/453)

The project is using the [jasmine-maven-plugin](https://github.com/searls/jasmine-maven-plugin)
to execute the Jasmine Specs for angular controllers. This plugin outputs JUnit XML
parsable by CI servers, such as [Jenkins](http://jenkins-ci.org/).


Compiling
---------
	mvn install


Running in Jetty
----------------
	mvn jetty:run

Then open <http://localhost:8080/> and play the piano. You can now edit your HTML and
Javascript and press reload in the browser to test your updates.


Manual Jasmine Spec Runner
--------------------------
After a build you will find a manual spec runner: /target/jasmine/ManualSpecRunner.html.
This is very useful to use while you are developing Angular controllers and Jasmine
specifications.

