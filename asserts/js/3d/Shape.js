(function(){
    var V=m3d.Vector,M=m3d.Matrix,S=m3d.Shape,C=m3d.Color,F=m3d.Face,L=m3d.Light;
    
    Klass.mixin(S,{
        //对称台型物体生成
        stackCreater:function(obj,scale){
            var s={};
            scale=scale||.8;
            var fM=M.scale(scale,scale,1).translate(0,0,1);
            var bM=M.scale(scale,scale,1).translate(0,0,-1);
            var l=obj.verticles.length;
            var fVerticles=fM.transforms(obj.verticles,true);
            var bVerticles=bM.transforms(obj.verticles,true);
            s.verticles=bVerticles.concat(obj.verticles).concat(fVerticles);
           
            var f=[];
            s.faces=[];
            var bf=[],ff=[];
            for(var i=0;i<l;i++){
                if(i!=l-1){
                    f.push([l+i,i,i+1,l+i+1]);
                    f.push([2*l+i,l+i,l+i+1,2*l+i+1]);
                }else{
                    f.push([l+i,i,0,l]);
                    f.push([2*l+i,l+i,l,2*l]);
                }
                ff.push(2*l+i);
                bf.push(l-1-i);
            }
            f.push(ff);
            f.push(bf);
            for(var j=0,ll=f.length;j<ll;j++){
                s.faces.push(new F({
                    refrect:f[j]
                }))
            }
            
            return new S(s);

        },
        //扫略图形生成
        sweepCreater:function(base,joints,func){
            
        },
        //旋转体生成
        revolutionCreater:function(){

        },
        podeCreater:function(obj){
            var Sf;
            var s={};
            var l=obj.verticles.length;
            var direct=obj.direct||'z';
            var scale=obj.scale||1;
            switch (direct){
                case 'x':
                    Sf=M.scale(-1,scale,scale)
                    break;
                case 'y':
                    Sf=M.scale(scale,-1,scale)
                    break;
                case 'z':
                    Sf=M.scale(scale,scale,-1);
                    break;
            }
            s.verticles=Sf.transforms(obj.verticles,true).concat(obj.verticles);
            s.faces=[];
            var bf=[],ff=[],f=[];
            for(var i=0;i<l;i++){
                if(i!=l-1){
                    f.push([l+i,i,i+1,l+i+1]);
                }else{
                    f.push([l+i,i,0,l]);
                }
                ff.push(l+i);
                bf.push(l-1-i);
            }
            f.push(ff);
            f.push(bf);
            for(var j=0,ll=f.length;j<ll;j++){
                s.faces.push(new F({
                    refrect:f[j]
                }))
            }
            return new S(s);
        },
        mapCreater:function(obj){
            var cubeSize=obj.cubeSize||2;
            var map=obj.map;
        },
        createCuboid:function(x,y,z){
            x=x/2,y=y/2,z=z/2;
            var s={};
            s.verticles=[
            [-x,-y,z],
            [x,-y,z],
            [x,y,z],
            [-x,y,z],
            [-x,y,-z],
            [x,y,-z],
            [x,-y,-z],
            [-x,-y,-z]
            ];
            s.faces=[
            [0,1,2,3],[1,6,5,2],  [2,5,4,3],   [0,3,4,7] ,  [1,0,7,6],  [6,7,4,5]
            ]
            return new S(s);
        },
        createBox:function(w){
            return S.createCuboid(w,w,w)
        },
        createHeart:function(scale){
            return S.stackCreater({
                verticles:[
                V.create([0,-2*scale,0]),
                V.create([3*scale,1*scale,0]),
                V.create([3*scale,2*scale,0]),
                V.create([2*scale,3*scale,0]),
                V.create([1*scale,3*scale,0]),
                V.create([0,2*scale,0]),
                V.create([-1*scale,3*scale,0]),
                V.create([-2*scale,3*scale,0]),
                V.create([-3*scale,2*scale,0]),
                V.create([-3*scale,1*scale,0])
                ]
            },.8)
        }
    })

})()

