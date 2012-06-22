# KickHim Server/Client
### Remote control for PC

KickHim was originally intended as a way to control a Windows computer from an iOS app, so we could close Minecraft, shutdown the computer, etc.   
Some people asked me to distribute it, so here you go!

What's included:  

- The server sources. It must be installed on the computer to control. It has been developped with Qt. The compiled binaries are in the "Downloads" section of [this repo](http://github.com/outadoc/KickHim).

- The client sources. It's the mobile app that will allow you to control the computer. Just indicate the IP of the said computer, and choose a punishment. It was built with [Appcelerator Titanium](http://appcelerator.com), works on iOS and should also be working on Android. The android build is included in the "Downloads" section but hasn't been fully tested. You must compile the iOS build yourself, due to Apple restrictions.

The port used by this project is 13374. Be sure it is open on your devices if you encounter any problem.