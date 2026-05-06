rm -r docs
ng b --output-path docs --base-href /landing-2/
cd docs
mv browser/* .
rm -r browser
cp index.html 404.html