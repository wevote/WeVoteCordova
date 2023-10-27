cd ./platforms/ios/www  || exit
rm bundle.js
cp /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js .
rm bundle.js.map
cp  /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js.map .
rm css
cp -r /Users/stevepodell/WebstormProjects/WebApp/build/css .
rm img
cp -r /Users/stevepodell/WebstormProjects/WebApp/build/img .
rm index.html
cp /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html .
cd /Users/stevepodell/WebstormProjects/WeVoteCordova
