# Debugging from your phone to the Python WeVoteServer running on your Mac

Download and install ngrok, "Secure Tunnels to Localhost"  [https://ngrok.com/](https://ngrok.com/)

Then run ngrok so that it proxys to your localhost port 8000:

Steves-MacBook-Pro-2017:~ stevepodell$ /Users/stevepodell/PythonProjects/ngrok/ngrok http 8000

![ScreenShot](images/NgrokUIWin.png)


Then configure your api server to respond at the url provided by ngrok

![ScreenShot](images/NgrokConfgJs.png)


Then your phone should be able to communicate with your API server.

*****

[Return to the WeVoteCordova home documentation page ](/README.md)