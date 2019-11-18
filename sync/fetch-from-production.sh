rsync -avz -e "ssh -p2683" \
    --exclude "/cgi-bin" \
    --exclude "/www/api.js" \
    --delete --progress litbaske@litbaskets.io:/home2/litbaske/public_html/ ./www