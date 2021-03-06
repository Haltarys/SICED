# SICED

Système d'Information de Contrôle d'Écran à Distance or _Remote Screen Control Information System_ is a full-stack application that can recursively split the screen into different sub-windows, each of which can display a different end module from the following:

- Vertical module: split the current window vertically into 2 sub-windows
- Horizontal module: split the current window horizontally into 2 sub-windows
- YouTube module: embed a YouTube video into the window
- Image module: embed a given image into the window
- Discord module: display the username and avatar picture of a user
- Weather forecasting module: display weather forecast on the window
- Imgur module: display images from Imgur

## Notes

In the backend, the modules are referred to as 'widgets' to avoid confusion with NestJS modules.
