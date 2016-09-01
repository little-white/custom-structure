var fs = require('fs');

var directoryConfigArr = [];

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('customize youre directory? (yes or no) ');
rl.prompt();
rl.on('line', function(line) {
    if (line === "no"){
        // default directory I always use
        directoryConfigArr = [
            'assets/images',
            'assets/js/vendor',
            'assets/fonts',
            'assets/css',
            'index.html',
        ];
        createDirectory(directoryConfigArr);
        console.log('create default directory successfully');
        console.log('structure:');
        directoryConfigArr.forEach(function(elem){
            console.log(elem);
        });
        process.exit(0);
    } else {
        rl.setPrompt('input the directory or done ');
        rl.prompt();
        if(line !== 'yes'){
            directoryConfigArr.push(line);
        }
        if(line === 'done'){
            createDirectory(directoryConfigArr);
            console.log('create customize directory successfully');
            console.log('structure:');
            directoryConfigArr.forEach(function(elem){
                console.log(elem);
            });
            process.exit(0);
        }
    }

    function createDirectory(config){
        function isFile(name){
            return name.indexOf('.') !== -1;
        }

        function isDirectory(name){
            return name.indexOf('/') !== -1;
        }

        var directoryObj = {};

        config.forEach(function(elem){

            //create file
            if(isFile(elem) && !directoryObj[elem]){
                fs.openSync(elem, 'w');
                directoryObj[elem] = true;
            }

            //create directory
            if(isDirectory(elem) && !directoryObj[elem]){
                var arr = [];
                elem.split('/').forEach(function(element){
                    arr.push(element);
                    if (!fs.existsSync(arr.join('/'))){
                        fs.mkdirSync(arr.join('/'));
                    }
                    directoryObj[arr.join('/')] = true;
                })
            }
        });
    }

}).on('close',function(){
    process.exit(0);
});