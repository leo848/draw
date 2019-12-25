var pColor = "black";
var pRadius = "10";
var cWidth;
var cHeight;
var ctx = myCanvas.getContext("2d"); 
(async () => {
 
   const { value: formValues } = await Swal.fire({
     title: 'Enter your canvas height and width',
     icon:'question',
     showCloseButton: false,
     html:
       '<h2>Use "default" for screen size</h2>'+
       '<input type="text" value="default" id="swal-input1" class="swal2-input">' +
       '<input type="text" value="default" id="swal-input2" class="swal2-input">',
     focusConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
     preConfirm: () => {
       return [
         document.getElementById('swal-input1').value,
         document.getElementById('swal-input2').value
       ]
     }
   })
   
   if (formValues) {
      cHeight = formValues[0];
      cWidth = formValues[1];
      ctx.canvas.width  = cWidth === "default" ? window.innerWidth-100 : cWidth;
      ctx.canvas.height = cHeight === "default" ? window.innerHeight-100 : cHeight;
      document.getElementById("myCanvas").style.marginLeft = (window.innerWidth - ctx.canvas.width)/2;
   }
   
   })();

   

function reportWindowSize() {
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight-50;
}

function getRandomColor() {
 var letters = '00123456789ABCDEF';
 var color = '#';
 for (var i = 0; i < 6; i++) {
   color += letters[Math.floor(Math.random() * letters.length)];
 }
 return color;
}
async function declareSize () {

      const { value: rad } = await Swal.fire({
      title: 'Size of the pencil?',
      icon: 'question',
      input: 'number',
      timer: 20000,
      showCloseButton: true,
      inputValue: Math.floor(Math.random()*251)
      })
      
      if (rad) {
        pRadius = rad;
      }
      
      };
async function declareColor () {

   const { value: col } = await Swal.fire({
   title: 'Color of the pencil?',
   icon: 'question',
   input: 'text',
   inputValue: getRandomColor()
   })
   
   if (col) {
     pColor = col;
   }
   
   };

   const Toast = Swal.mixin({
      toast: true,
      showCloseButton: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
       
function Leave_a_Mark(MyWhere) {
  var rect = myCanvas.getBoundingClientRect();
  ctx.beginPath();
ctx.fillStyle = (pColor === "random" ? getRandomColor() : pColor);
  ctx.arc(MyWhere.clientX - rect.left, MyWhere.clientY - rect.top, pRadius, 0, Math.PI * 2);
  pColor === "clear" ? ctx.clearRect(MyWhere.clientX - rect.left-pRadius*1.4, MyWhere.clientY - rect.top-pRadius*1.4, pRadius*2.8, pRadius*2.8) : ctx.fill();
  }


function MyTouchMoveHandler(e) {
  for (var i=0; i < e.touches.length; i++) {
       Leave_a_Mark(e.touches[i]);
       }
  e.preventDefault()
  }
  
  
var mouse_is_down = false;

function refresh() {
   Swal.fire({
      title: 'Are you sure you want to clear your canvas?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes!',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.value) {
         ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        Swal.fire(
          'Cleared!',
          'Your canvas has been cleared.',
          'success'
        )
      }
    })


}

function MyMouseDownHandler(MyEvent) {
  if (MyEvent.which == 1) mouse_is_down= true;
  }

function MyMouseUpHandler(MyEvent) {
  if (MyEvent.which == 1) mouse_is_down= false;
  }

function MyMouseMoveHandler(MyEvent) {
  if (mouse_is_down) Leave_a_Mark(MyEvent);
  }
var dwnld = document.getElementById("myDownload");
var dataURL;
myCanvas.addEventListener("mousedown", MyMouseDownHandler);                                                               
myCanvas.addEventListener("mouseup", MyMouseUpHandler); 
myCanvas.addEventListener("touchmove", MyTouchMoveHandler);
myCanvas.addEventListener("mousemove", MyMouseMoveHandler);   
function display(){
      

      dataURL = myCanvas.toDataURL();
      document.getElementById("canvasImg").src=dataURL;
      Toast.fire({
         icon: 'success',
         title: 'Displayed successfully'
       });
      setTimeout(function(){window.scrollBy({ top: 2000000000, left: 0, behavior: "smooth" })});
      document.getElementById("canvasImg").style.marginLeft = (window.innerWidth - ctx.canvas.width)/2;
};
      Mousetrap.bind("space", function() {display();});
      Mousetrap.bind(['command+c', 'ctrl+c'], function() {refresh();});
      Mousetrap.bind(['c', '#'], function() {declareColor();});
      Mousetrap.bind('s', function() {declareSize();});
      Mousetrap.bind('r e d', function() {pColor = "red";});
      Mousetrap.bind('y e l l o w', function() {pColor = "yellow";});
      Mousetrap.bind('g r e e n', function() {pColor = "green";});
      Mousetrap.bind('b l u e', function() {pColor = "blue";});
      Mousetrap.bind('b r o w n', function() {pColor = "brown";});
      Mousetrap.bind('b l a c k', function() {pColor = "black";});
      Mousetrap.bind('d e f a u l t', function() {pColor = "black";});
      Mousetrap.bind('p u r p l e', function() {pColor = "purple";});
      Mousetrap.bind('p i n k', function() {pColor = "pink";});
      Mousetrap.bind('w h i t e', function() {pColor = "white";});
      Mousetrap.bind('g r e y', function() {pColor = "grey";});
      Mousetrap.bind('l i g h t b l u e', function() {pColor = "lightblue";});
      Mousetrap.bind('l i g h t g r e e n', function() {pColor = "lightgreen";});
      Mousetrap.bind('d a r k b l u e', function() {pColor = "darkblue";});
      Mousetrap.bind('d a r k g r e e n', function() {pColor = "darkgreen";});
      Mousetrap.bind('r a n d o m', function() {pColor = "random";});

    
       
       
