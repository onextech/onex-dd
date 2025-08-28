# Folder Structure

## Understanding your app's folder structure

Our apps are built on top of NextJS, therefore most of the application’s folder structure takes on NextJS’s default paths.

Depending on the nature of your app, you may have additional folders that are specific to your app's requirements.

The following is an overview of the key folders and their purposes:


```
+-- pages/          # routes based on NextJS file-based routing system
|
+-- src/
    |
    +-- app         # app-related configurations, routes, and constants
    |
    +-- components  # pure ui components
    |
    +-- hooks       # shared hooks across the app
    |
    +-- modules     # features scoped to a specific domains to contain business logic
    |
    +-- providers   # shared contexts across the app
    |
    +-- types       # shared typescript types
    |
    +-- utils       # utility functions
```
