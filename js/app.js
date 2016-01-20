var todoData = [];

$( document ).ready(function() {

      // LOAD MODULES

      app = {
        initApp: function () {
                return console.log("App Starts");
		  	},

        genId: function () {
            			var i, random;
            			var uuid = '';

            			for (i = 0; i < 32; i++) {
            				random = Math.random() * 16 | 0;
            				if (i === 8 || i === 12 || i === 16 || i === 20) {
            					uuid += '-';
            				}
            				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            			}
                  console.log(uuid+ " Generated");
            			return uuid;
  		},

        addTodo : function(){
                    console.log("YO! Got");

                    //Get Data
                     id = this.genId();
                     title = $('#todo-title').val();
                     date = $('#todo-date').val();
                     status = 'todo';


                     var element = {};
                     element.id = id;
                     element.title = title;
                     element.date = date;
                     element.status = status;
                     todoData.push(element);

                      // console.log(todoData);
                      //console.log(this);

                      console.log(JSON.stringify(todoData));

                      app.check();
                      app.closeModal();


                      return false;

        },

        closeModal: function(){

                      $("#myModal").modal("hide");
                      title = $('#todo-title').val('');

        },

        check: function(){
                //LOOP THROUGH DATA
                $.each(todoData, function( item, todo ){

                  console.log( "Index #" + item + ": " + todo.id );

                  if (todo.status === "todo"){
                    console.log("This "+todo.id+" is yet to be done!");
                    app.appendTodo(todo, 'todo');

                  }else if (todo.status === "doing"){
                    console.log("This "+todo.id+" is yet to be ongoing!");

                  }else if (todo.status === "done"){
                      console.log("This "+todo.id+" is done!");
                  }else{
                    return;
                  }




                });
        },

        appendTodo : function(todo, status){
          //APPEND TO APPROPRIATE STATUS VIEW
          data = "<li><div class='row' id='"+todo.id+"'><div class='col-md-6 task'>"+
                 todo.title+" <span class='label label-default'>"+todo.date+"</span>"+
                 "</div><div class='col-md-2 action  edit'><i class='fa fa-pencil-square-o'></i></div>"+
                 "<div class='col-md-2 action delete'><i class='fa fa-remove'></i></div>"+
                 "<div class='col-md-2 action view'><i class='fa fa-eye'></i></div>"+
                 "<div class='col-md-2 action check'><i class='fa fa-check-circle'></i></div>"+
                 "</div></li>"
          // console.log(data);

          if(status  === "todo"){
              $('.todo-list').append(data);
          }



          console.log(todo.id+ ' Appended!');

        },

        save: function (namespace, data) {
                    if (arguments.length > 1) {
                      return localStorage.setItem(namespace, JSON.stringify(data));
                  } else {
                        var store = localStorage.getItem(namespace);
                        return (store && JSON.parse(store)) || [];
                  }
          }

      }









    // CALL METHODS
    app.initApp();

      $('#add-todo').on('click', function(){
        app.addTodo();
        return false;
      });

      $("#todo-date").datepicker();

});
