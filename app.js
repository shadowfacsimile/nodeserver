const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.write('<p>Hello World!</p>');
        res.write('<p>Fill this form</p>');
        res.write('<form method="post" action="/formaction">');
        res.write('<label for="fname">First name:</label><br>');
        res.write('<input type="text" id="fname" name="fname"><br>');
        res.write('<label for="lname">Last name:</label><br>');
        res.write('<input type="text" id="lname" name="lname">');
        res.write('<input type="submit" value="Submit" />');
        res.write('</form>');
        res.end();
    }

    if (req.url === '/favicon.ico') {
        res.write('Sorry, no favicon for you!');
        res.end();
    }

    if (req.method === 'POST' && req.url === '/formaction') {
        console.log('Processing POST for formaction...');

        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            console.log('body: ' + body);

            let parsed = querystring.parse(body);
            console.log(parsed);

            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.setHeader('X-Powered-By', 'bacon');
            res.write(`<p style='font-style: italic; background-color: #616e96; color: #add8e6;'>${JSON.stringify(parsed)}</p>`);
            res.write('<em style="font-style: italic; background-color: #616e96; color: #add8e6;">'
                + capitalizeFirstLetter(parsed.fname) + ' '
                + capitalizeFirstLetter(parsed.lname) + '</em>');
            res.end();
        }).on('error', (err) => {
            console.error(err.stack);
        });
    }
});

server.listen(3000);

console.log('Listening to port 3000...');

let capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
