document.addEventListener("DOMContentLoaded", function(event) {
    var obj = {

        brush: 'brush',
        flood: 'flood',
        matrix: [],
        matrixCash: [],
        pxls: document.getElementsByClassName('pxl'),
        canvas : document.getElementsByClassName('canvas')[0],
        currentColor : document.getElementsByClassName('current-color-box')[0],
        colors : document.getElementsByClassName('colors')[0],
        colorType: document.getElementById('color-type'),
        canvasSize : document.getElementById('applyCanvasSize'),
        colorPicker : document.getElementById('colorPicker'),
        btnLoad : document.getElementById('btn-load'),
        btnSave : document.getElementById('btn-save'),
        btnClear : document.getElementById('btn-clear'),
        paintColor : 'red',
        fillingType : this.brush,
        canvasHeight : document.getElementById('canvas-height'),
        canvasWidth : document.getElementById('canvas-width'),

        init: function() {

            this.currentColor.style.backgroundColor = this.paintColor;


            this.addEvents();

            this.createCanvas(this.canvasWidth.value, this.canvasHeight.value);
        },

        addEvents: function () {
            var self = this;
            var colorTypes = self.colorType.elements['color-fill'];

            for(var i=0; i<colorTypes.length; i++) {
                colorTypes[i].addEventListener('click', function (e) {
                    self.fillingType = e.target.value;
                })
            }

            var mouseOverHandler = function (e) {
                e.target.style.backgroundColor = self.paintColor;
            };

            self.colors.addEventListener('click', function (e) {
                self.paintColor = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
                self.currentColor.style.backgroundColor = self.paintColor;

            });

            self.canvas.addEventListener('click', function (e) {
                if(self.fillingType === self.brush)
                    e.target.style.backgroundColor = self.paintColor;
                else {
                    var exTime = Date.now();
                    var color = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
                    self.makeMatrix();
                    var node = self.getElement(parseInt(e.target.dataset.row), parseInt(e.target.dataset.col));
                    self.floodFillCanvas.call(self, node, color, self.paintColor);
                    console.log(Date.now() - exTime);
                }
            });

            self.canvas.addEventListener('mouseup', function (e) {
                self.canvas.removeEventListener('mouseover', mouseOverHandler);
            });

            self.canvas.addEventListener('mousedown', function (e) {
                self.canvas.addEventListener('mouseover', mouseOverHandler);
            });


            self.canvasSize.addEventListener('click', function (e) {
                self.createCanvas.call(self, self.canvasWidth.value, self.canvasHeight.value);
                e.preventDefault();
            });

            self.colorPicker.addEventListener('change', function (e) {
                self.paintColor = e.target.value;
                self.currentColor.style.backgroundColor = e.target.value;
            });

            self.btnSave.addEventListener('click', function (e) {
                self.saveCanvas.call(self, null);
                e.preventDefault();
            });

            self.btnLoad.addEventListener('click', function (e) {
                self.loadCanvas.call(self, null);
                e.preventDefault();
            });

            self.btnClear.addEventListener('click', function (e) {
                self.createCanvas.call(self, self.canvasWidth.value, self.canvasHeight.value);
                e.preventDefault();
            });
        },

        createCanvas: function(width, height) {
            this.canvas.innerHTML = '';
            for(var i=1; i<=height/5; i++) {
                var row = document.createElement('div');
                row.className = 'row';

                for (var j=1; j<=width/5; j++) {
                    var box = document.createElement('div');
                    box.className = 'pxl color3';
                    box.dataset.row = i;
                    box.dataset.col = j;
                    row.appendChild(box);
                }

                this.canvas.appendChild(row);
            }
        },

        saveCanvas: function () {
              localStorage.setItem("canvas", this.canvas.innerHTML);
        },

        loadCanvas: function () {
            this.canvas.innerHTML = localStorage.getItem("canvas");
        },

        floodFillCanvas: function (node, targetColor, replacementColor) {
            console.log('0');

            if(!node) {
                return false;
            }


            if(targetColor === replacementColor) {
                return false;
            }

            if(window.getComputedStyle(node.el, null).getPropertyValue("background-color") !== targetColor) {
                return false;
            }

            node.el.style.backgroundColor = replacementColor;

            this.floodFillCanvas(
                this.getElement(parseInt(node.row)+1, parseInt(node.col)),
                targetColor, replacementColor
            );

            this.floodFillCanvas(
                this.getElement(parseInt(node.row)-1, parseInt(node.col)),
                targetColor, replacementColor
            );


            this.floodFillCanvas(
                this.getElement(parseInt(node.row), parseInt(node.col) - 1),
                targetColor, replacementColor
            );


            this.floodFillCanvas(
                this.getElement(parseInt(node.row), parseInt(node.col) + 1),
                targetColor, replacementColor
            );

        },

        makeMatrix: function() {
            this.matrix = [];
            this.matrixCash = [];

            for(var i=0; i<this.pxls.length; i++) {
                var obj = {
                        row : parseInt(this.pxls[i].dataset.row),
                        col : parseInt(this.pxls[i].dataset.col),
                        color : window.getComputedStyle(this.pxls[i], null).getPropertyValue("background-color"),
                        el : this.pxls[i]
                };

                this.matrix.push(obj);
            }
        },

        getElement: function (row, col) {

              for (var i=0; i<this.matrix.length; i++) {
                  if(parseInt(this.matrix[i].row) === row && parseInt(this.matrix[i].col) === col) {
                      return this.matrix[i];
                  }
              }

              return null;
        }
    };




    obj.init();
});




