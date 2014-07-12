void function(){
  var nextFrame = (function(){
      var request = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame|| 
                    function(callback){
                      setTimeout(callback, 16)
                    }

      var cancel = window.cancelAnimationFrame ||
                   window.webkitCancelAnimationFrame ||
                   window.mozCancelAnimationFrame ||
                   window.webkitCancelRequestAnimationFrame ||
                   function(tid){
                      clearTimeout(tid)
                   }
    
    return function(callback){
      var id = request(callback);
      return function (){
        cancel(id);
      }
    }
  })();

  var vectors = {
    "R": [
      [0,0,0], 
      [1,0,0],
      [1.6,-0.2,0],
      [1.6,-1,0],
      [1.2,-1.2,0],
      [1.6,-2.2,0],
      [1.2,-2.2,0],
      [0.8,-1.2,0],
      [0.4,-1.2,0],
      [0.4,-2.2,0],
      [0,-2.2,0],
      [0,-.3,0],
      [.3,-.3,0], 
      [1,-.3,0],
      [1.3,-0.5,0],
      [1.3,-0.7,0],
      [1,-0.9,0],
      [.3,-0.9,0],
      [.3,-.3,0], 
      [0,-.3,0], 
    ],
    "E": [
      [0, 0, 0],
      [1.5, 0, 0],
      [1.5, -0.3 , 0],
      [.3, -0.3, 0],
      [.3, -0.9, 0],
      [1.3, -0.9, 0],
      [1.3, -1.2, 0],
      [0.3, -1.2, 0],
      [0.3, -2.0, 0],
      [1.5, -2.0, 0],
      [1.5, -2.3, 0],
      [0, -2.3, 0]
    ],
    "E": [
      [0, 0, 0],
      [1.5, 0, 0],
      [1.5, -0.3 , 0],
      [.3, -0.3, 0],
      [.3, -0.9, 0],
      [1.3, -0.9, 0],
      [1.3, -1.2, 0],
      [0.3, -1.2, 0],
      [0.3, -2.0, 0],
      [1.5, -2.0, 0],
      [1.5, -2.3, 0],
      [0, -2.3, 0]
    ],
    "G": [
      [0, 0, 0],
      [1.8, 0, 0],
      [1.8, -0.3, 0],
      [.3, -0.3, 0],
      [.3, -2, 0],
      [1.5, -2, 0],
      [1.5, -1.2, 0],
      [1.8, -1.2, 0],
      [1.8, -2.3, 0],
      [0, -2.3, 0]
    ],
    "U": [
      [0, 0, 0],
      [.3, 0, 0],
      [.3, -2, 0],
      [1.4, -2, 0],
      [1.4, 0, 0],
      [1.7, 0, 0],
      [1.7, -2.3, 0],
      [0, -2.3, 0]
    ],
    "L": [
      [0, 0, 0],
      [.3, 0, 0],
      [.3, -2, 0],
      [1.5, -2, 0],
      [1.5, -2.3, 0],
      [0, -2.3, 0]
    ],
    "A": [
      [.6+0, 0, 0],
      [.6+.3, 0, 0],
      [.6+1.2, -2.3, 0],
      [.6+.8, -2.3, 0],
      [.6+.6, -1.8, 0],
      [.6+0.125, -.42, 0],
      [.6+-0.5, -2.3, 0],
      [.6+-.9, -2.3, 0],
    ],
    "R2": [
      [0,0,0], 
      [1,0,0],
      [1.6,-0.2,0],
      [1.6,-1,0],
      [1.2,-1.2,0],
      [1.6,-2.2,0],
      [1.2,-2.2,0],
      [0.8,-1.2,0],
      [0.4,-1.2,0],
      [0.4,-2.2,0],
      [0,-2.2,0],
      [0,-.3,0],
      [.3,-.3,0], 
      [1,-.3,0],
      [1.3,-0.5,0],
      [1.3,-0.7,0],
      [1,-0.9,0],
      [.3,-0.9,0],
      [.3,-.3,0], 
      [0,-.3,0], 
      ]

  }

  var lines = {}, transforms = {}, args={}, particles=[], index=0;
  function createText(text){
    var vs = vectors[text];
    particles[text] = [];
    var ls = [];
    for(var i =0, len = vs.length; i < len;i++){
      var vec = vs[i];
      var nvec = [vec[0], vec[1], .6];
      vs.push(nvec);
      ls.push([i, len + i])
      if(i == len-1){
        ls.push([i, 0])
        ls.push([i+len, len])
      }else{
        ls.push([i, i+1])
        ls.push([i+len, i+len+1])
      }
      particles[text].push([
        (Math.random()-.5)*20,
        (Math.random()-.5)*10,
        (Math.random()-.5)*100
      ])

    }
    lines[text] = ls;
    args[text] = {rx: (Math.random())/500, ry: 0, rz:0, tx:((index++) - 3)*2.4, ty: 4, tz:-2, ts:.1}
    transforms[text] = mat4.ident();
  }
  void function (){
    for(var i in vectors){
      createText(i)
    }
  }();
  // createText('R')
  // transforms["R"] = mat4.ident();
  // args["R"] = {rx: 0, ry: 0, rz:0, tx:-1, ty:1, tz:1}
  // lines["E"] = createText(vectors['E'])
  // transforms["E"] = mat4.ident();
  // args["E"] = {rx: 1, ry: 1, rz:1, tx:0, ty:1, tz:1}

  var speed = .5;
  function drawText(text){
    var vs = vectors[text];
    var ls = lines[text];
    var ps = particles[text];
    var transform = transforms[text];
    mat4.ident(transform)
    mat4.translate(transform, -1, -1);
    // args[text].rx += (Math.random()+1)/500;
    // args[text].ry += (Math.random()+1)/500;
    // args[text].rz += (Math.random()+1)/500;
    // args[text].tz += (Math.random() + 1)/500;
    // mat4.rotateN(transform, args[text].rx, args[text].ry, args[text].rz);
    var tz = args[text].tz;
    var ts = args[text].ts;
    // if(tz > -.2){
    //   args[text].ts = .03
    // }
    // if(tz < -4){
    //   args[text].ts = -.03
    // }
    // args[text].tz *= (1+args[text].ts);
    mat4.translate(transform, args[text].tx, args[text].ty, args[text].tz);
      ps.forEach(function(p, index){
        p[2] += speed;
        if(p[2] > 30){
          p[2] = -60;
        }
        var v = vs[index];
        render.drawvec(p);
      })
    if(hover){
      // ls.forEach(function(line){
      //   render.drawline(vs[line[0]],vs[line[1]], transform)
      // })
    }

  }
  function draw(){
    for(var i in vectors){
      drawText(i)
    }
  }
  // var vectors = [
  //   vec3.create(2,0, 0), 
  //   vec3.create(0,2, 0), 
  //   vec3.create(-2,0, 0), 
  //   vec3.create(0,0, 2),

  //   vec3.create(1, 1, 1),
  //   vec3.create(-1, 1, 1),
  //   vec3.create(-1, -1, 1),
  //   vec3.create(1, -1, 1),
  //   vec3.create(1, 1, -1),
  //   vec3.create(-1, 1, -1),
  //   vec3.create(-1, -1, -1),
  //   vec3.create(1, -1, -1)
  // ]


  // var vectors = [
  //   vec3.create(2,0, 0), 
  // ]

  // // var sence = new Sence();
  // // sence.add([

  // // ])


  // var lines = [
  //   {
  //     lines: [[0, 1], [1, 2], [0, 2], [0, 3], [1, 3], [2, 3]],
  //     transform: mat4.createTranslate(2,2,2)
  //   },
  //   {
  //     lines: [
  //       [4, 5], 
  //       [5, 6], 
  //       [6, 7], 
  //       [7, 4], 
  //       [8, 9], 
  //       [9, 10],
  //       [10, 11],
  //       [11, 8],
  //       [4, 8],
  //       [5, 9],
  //       [6, 10],
  //       [7, 11]
  //     ],
  //     transform: mat4.ident()
  //   },

  // ]

  // function changeTransfrom(){
  //   // mat4.translate(lines[0].transform, .01,.01,.01);
  // }

  // var sence1 = mat4.createTranslate(1,0,0);

  var $ = function(id){
    return document.getElementById(id)
  }

  var canvas = $('canvas')
  canvas.width = canvas.offsetParent.offsetWidth;
  canvas.height = canvas.offsetParent.offsetHeight;
  var render = new Render({
    canvas: $('canvas')
  })
  render.camera.focus = 6;
  window.onresize = Regular.util.throttle(function(){
    canvas.width = render.width = canvas.offsetParent.offsetWidth;
    canvas.height = render.height = canvas.offsetParent.offsetHeight;
  },1000)





  var hover;
  var speed = 0;
  var cancel;
  function update(){
    if(hover){
      speed+=.02;
      if(speed > 2) speed =2;
    }else{
      speed-=.03;
      if(speed < 0) speed =0;

      if(speed === 0 && cancel) cancel();
    }

    render.clear();

    draw();
    
    cancel = nextFrame(update);
  }

  update()

  $('header').addEventListener('mouseenter', function(){
    cancel();
    update();
    hover = true;
  })
  $('header').addEventListener('mousemove', function(e){
    var camera = render.camera;
    var x = -(e.pageX - render.width) / render.width * 3;
    var y = (e.pageY - render.height) / render.height * 3;
    camera.transform[3] = x ;
    camera.transform[7] = y;
    // render.camera.transform()
  })
  $('header').addEventListener('mouseleave', function(){
    hover = false;
    // render.clear();

  })


}()

/**
 * regularjs 
 * @return {[type]} [description]
 */
void function slogan(){
  var $ = function(id){
    return document.getElementById(id);
  } 
  var h2 = document.getElementById('slogan');  
  var Slogan = Regular.extend({
    template: "<h2 on-mouseenter={{hover=true}} on-mouseleave={{hover=false}}>Re{{#if hover}}<span r-animate>act+An</span>{{/if}}gular</h2>"
  }) 


  new Slogan().inject(h2, 'after');
  Regular.dom.remove(h2)


  var Demo = Regular.extend({
    data: {}
  })
  var html_editor = CodeMirror($('demo-html'), {
    value: $('example').innerHTML.trim(),
    mode:  "xml",
    theme: "solarized",
    extraKeys: {
      Tab: function(cm) {
          var spaces = new Array(cm.getOption("indentUnit") + 1).join(" ")
          cm.replaceSelection(spaces, "end", "+input")
      }
    }
  });
  var js_editor_1 = CodeMirror($('demo-js-1'), {
    value: "var App = Regular.extend({\n  template:'#example', \n",
    mode:  "javascript",
    theme: "solarized",
    readOnly: 'nocursor',
    extraKeys: {
      Tab: function(cm) {
          var spaces = new Array(cm.getOption("indentUnit") + 1).join(" ")
          cm.replaceSelection(spaces, "end", "+input")
      }
    }
  }); 
  var js_editor = CodeMirror($('demo-js'), {
    value: 
      "login: function(){\n this.data.username = prompt('input username', '')\n return false\n},\nadd: function(draft){\n var data = this.data;\n data.todos.push({content: draft});\n data.draft = '';\n},\nremove: function(todo){\n var data = this.data;\n var index = data.todos.indexOf(todo);\n if(~index) data.todos.splice(index, 1);\n}",
    mode:  "javascript",
    theme: "solarized",
    extraKeys: {
      Tab: function(cm) {
          var spaces = new Array(cm.getOption("indentUnit") + 1).join(" ")
          cm.replaceSelection(spaces, "end", "+input")
      }
    }
  });
  var js_editor_3 = CodeMirror($('demo-js-3'), {
    value: "})\napp = new App({data: {todos: []}}).inject('#demo-view')",
    mode:  "javascript",
    theme: "solarized",
    readOnly: 'nocursor',
    extraKeys: {
      Tab: function(cm) {
          var spaces = new Array(cm.getOption("indentUnit") + 1).join(" ")
          cm.replaceSelection(spaces, "end", "+input")
      }
    }
  });


  var App = Regular.extend({
    template: "#example",
    data: {todos: []},
    login: function(){
      this.data.username = prompt("please enter you username", "")
    },
    add: function(draft){
      var data = this.data;
      data.todos.push({content: draft});
      data.draft = "";
    },
    remove: function(todo){
      var data = this.data;
      var index = data.todos.indexOf(todo);
      if(~index) data.todos.splice(index, 1);
    }
  })

  app = new App().inject('#demo-view')

  Regular.dom.on(nes.one('.j-run'), 'click' ,function(ev){
    ev.preventDefault();
    runDemo();
  })

  var prefix = js_editor_1.getValue();
  var suffix = js_editor_3.getValue();
  function runDemo(){
    app.destroy();
    nes.one('#example').innerHTML = html_editor.getValue();
    var code = [prefix, js_editor.getValue(), suffix ].join("\n")

    eval(code);
  }

}()

