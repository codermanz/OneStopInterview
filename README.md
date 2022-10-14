# OneStopInterview
Software Engineering class project

## Setup
First things first, clone the repository:
```sh
$ git clone https://github.com/Jesch101/OneStopInterview.git
$ cd OneStopInterview
```

Make sure you have python3 version 3.10.5 or above, and pip3 version 22.2.2 or above downloaded on your system. You can check this with:
```sh
$ python3 --version
$ pip3 --version
```
If you do not have python downloaded, you can download it from [here](https://www.python.org/downloads/)

Create a vitual environment to install dependencies in and activate it:
```sh
$ pip3 install virtualenv
$ virtualenv env
$ source env/bin/activate
```
 Now install the project dependencies:
 ```sh
 (env)$ pip3 install -r requirements.txt
 ```
 Note the `(env)` in front of the prompt. This indicates that this terminal session operates in a virtual environment set up by `virtualenv`.
 
 Once `pip3` has finished downloading the dependencies:
 ```sh
 (env)$ cd OneStopInterview
 (env)$ python3 manage.py runserver
 ```
 This will open up a web page at `http://127.0.0.1:8000/` displaying the project.
