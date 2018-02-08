document.addEventListener("DOMContentLoaded", function(event) {
    function init() {
        var canvas = document.getElementsByClassName('canvas')[0];
        var currentColor = document.getElementsByClassName('current-color-box')[0];
        var colors = document.getElementsByClassName('colors')[0];
        var canvasSize = document.getElementById('applyCanvasSize');
        var brushColor = 'red';
        var canvasHeight = 100;
        var canvasWidth = 300;

        currentColor.style.backgroundColor = brushColor;

        colors.addEventListener('click', function (e) {
            brushColor = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
            currentColor.style.backgroundColor = brushColor;

        });

        canvas.addEventListener('click', function (e) {
            e.target.style.backgroundColor = brushColor;
        });

        canvasSize.addEventListener('click', function (e) {
            // alert('Click');

            resizeCanvas(e.target, canvas);
            e.preventDefault();
        });

        createCanvas(canvasWidth, canvasHeight, canvas);
    }

    function createCanvas(width, height, parent) {
        parent.innerHTML = '';
        for(var i=1; i<=height/5; i++) {
            var row = document.createElement('div');
            row.className = 'row';

            for (var j=1; j<=width/5; j++) {
                var box = document.createElement('div');
                box.className = 'pxl';
                row.appendChild(box);
            }

            parent.appendChild(row);
            console.log(i);
        }
    }

    function resizeCanvas(obj, parent) {
        var width = document.getElementById('canvas-width').value;
        var height = document.getElementById('canvas-height').value;
        createCanvas(width, height, parent);
    }

init();
});




