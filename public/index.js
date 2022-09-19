let clientSocket
let state = 'enterName'

function setup(){
    createCanvas(windowWidth, windowHeight)
    background('midnightblue')
    //fetch server ip from node endpoint
    fetch('http://localhost:666/ip')
        .then(res => res.json())
        .then(data => {
            select('#info').html(data.ip)
            
        })
        
    //io kommer fra socket.io biblioteket
    clientSocket = io.connect()
    clientSocket.on('newMessage', message => {
        let p = createElement('p', message)
        select('#chat').child(p)
        select('#chat').elt.scrollTop = select('#chat').elt.scrollHeight 
    })
    select('#nameButton').mousePressed(()=>{
        console.log('ny bruger - send til server')
        clientSocket.emit('newUser', select('#name').value())
        select('#nameBox').addClass('hide')
        select('#chatBox').removeClass('hide')
    })
}

function draw(){
}

function keyPressed(){
    if(key == 'Enter'){
        let message = select('#message').value()
        //emit tager et "emne" og noget data
        clientSocket.emit('chat', message)
        select('#message').value('')
    }
}