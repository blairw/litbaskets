# This file takes all the HTML files in `html-fragments/` and generates `litbaskets.html` (output)

# Constants

FRAGHTMLDIR="./fragments-html"
FRAGCSSJSDIR="./fragments-cssjs"
EXTJSCRDIR="$FRAGCSSJSDIR/external-other"
YARNPKGDIR="$FRAGCSSJSDIR/external-yarn/node_modules"
OUTFILE="./litbaskets.html"

# Clear existing file

echo > $OUTFILE


# --------

# Start generating

cat "$FRAGHTMLDIR/100-header.html" >> $OUTFILE

# CSS and JS parts

echo "<style>" >> $OUTFILE
cat "$YARNPKGDIR/patternfly/dist/css/patternfly.min.css"
echo >> $OUTFILE
cat "$YARNPKGDIR/patternfly/dist/css/patternfly-additions.min.css"
echo "</style>" >> $OUTFILE

echo "<style>" >> $OUTFILE
cat "$YARNPKGDIR/select2/dist/css/select2.min.css?"
echo "</style>" >> $OUTFILE

echo "<style>" >> $OUTFILE
cat "$EXTJSCRDIR/mctoggle.css"
echo "</style>" >> $OUTFILE

echo "<style>" >> $OUTFILE
cat "$FRAGCSSJSDIR/styles3.css"
echo "</style>" >> $OUTFILE

echo "<script>" >> $OUTFILE
cat "$YARNPKGDIR/jquery/dist/jquery.min.js"
echo "</script>" >> $OUTFILE



