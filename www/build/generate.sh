OUTPUTFILE="../deploy/index.html"

mkdir temp

cd fragments-php
for d in ./*.php; do
	echo "Processing $d"
	
	# Assuming php 8.2.1 ish
	php "$d" > "../temp/$d.html"
done
cd ..

cat temp/*.html > $OUTPUTFILE
rm -rf temp

unix2dos $OUTPUTFILE

