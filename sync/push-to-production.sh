rsync -avz -e "ssh -p2683" \
    --no-perms --no-owner --no-group \
    --exclude "/cgi-bin" \
    --exclude "/www/api.js" \
    --delete --progress ./www/ litbaske@litbaskets.io:/home2/litbaske/public_html