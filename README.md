# How to use
- Download the zip file and extract it into a directory
- cd into that directory
- Run the following commands to setup the node_modules folder
    - `npm install`
    - `npm install howler`
- Now run `npm start` to open the website

# Project Structure

## node_modules
- Any library that is installed via npm goes to the node_modules directory.
- Node.js automatically looks for external modules in this directory.
- `npm install howler` command is run to install an additional audio library that enables us to render sound effects

## public
- Contains the `index.html` file which is ultimately responsible for rendering our entire app.
- The div with `id=root` in the `index.html` file is where our entire app lives.
- The following command present in `src/index.js` renders the app in the target id `root`.  
`ReactDom.render(<App />, document.getElementById('root'))`

## src

### components
### css
### data
### images
