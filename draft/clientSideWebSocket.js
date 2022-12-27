
$(document).ready(function() {

    var messageBox = $('#messages-box')
    var sock       = new WebSocket('ws://localhost:3000/chat')

    window.ws      = sock
  
    sock.onopen    = function(event) { messageBox.prepend('<div class="alert alert-success">Connection opened</div>'); sock.send("just connected!") }
    sock.onclose   = function(event) { messageBox.prepend('<div class="alert alert-danger">Connection closed</div>') }
    sock.onerror   = function(event) { messageBox.prepend('<div class="alert alert-danger">Unknown error</div>'); console.log(event) }
    sock.onmessage = function(event) { messageBox.prepend('<div class="alert alert-secondary">' + event.data + '</div>'); console.log(event) }
  
    window.sendMessage = function() {
      console.log('in sendMessage')
      var message = $('#message-input').val()
   
      sock.send(message)
    }
    window.sendUsername = function() {
        console.log('in sendUsername')
        var username = $('#username-input').val()
        const data = {username:username, type:'username'}
        const JSONmessage = JSON.stringify(data)
        console.log(JSONmessage)
        sock.send(JSONmessage)
      }

})