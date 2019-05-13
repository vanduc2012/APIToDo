
var ViewModels = function () {
    var self = this;
    self.listStudents = ko.observableArray([]);
    self.error = ko.observable();
    self.id = ko.observable();
    self.codeView = ko.observable();
    self.name = ko.observable();
    self.address = ko.observable();
    self.birthDay = ko.observable();
    self.phoneNumber = ko.observable();
    self.genre = ko.observable();
    self.isDelete = ko.observable();
    self.classesId = ko.observable();
    self.classes = ko.observableArray();


    //uri to api
    var studentsUri = '/api/students/';
    var classUri = '/api/classes/';

    // function excute api
    function ajaxHelper(uri, method, data) {
        self.error(''); //clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }
    


  
    //filter
    var flag = "active";
    //get list all students
    self.getAllStudents = function () {
        flag = "all";
        ajaxHelper(studentsUri + "?all=2" , 'GET').done(function (data) {
                self.listStudents(data);
            });
        
    };
    
    //get list student active
    self.getAllStudentsCheck = function () {
        flag = "active";
        ajaxHelper(studentsUri + "?all=1&isDelete=false", 'GET')
            .done(function (data) {

                self.listStudents(data);
            });
       
    };

    //self.getAllStudentsCheck();
    self.getAllStudentsDeleted = function () {
        flag = "removed";
        ajaxHelper(studentsUri + "?all=1&isDelete=true"
            , 'GET')
            .done(function (data) {

                self.listStudents(data);

            });
        
    };
    // search student
    
    //seacr for removed
    self.searchStudent = function () {
        if (flag === "all") {
            ajaxHelper(studentsUri + "?all=2" , 'GET').done(function (data) {
                self.listStudents(data);
            });
        }
        else {
            if (flag === "active") {
                ajaxHelper(studentsUri + "?all=11&isDelete=false", 'GET').done(function (data) {

                    self.listStudents(data);
                });
            }
            else {
                ajaxHelper(studentsUri + "?all=1&isDelete=true", 'GET')
                    .done(function (data) {

                    self.listStudents(data);
                });
            }
        }
       
    };
   

    self.newStudent = {
        id: ko.observable(),
        codeView: ko.observable(),
        name: ko.observable(),
        address: ko.observable(),
        phoneNumber: ko.observable(),
        birthDay: ko.observable(),
        genre: ko.observable(),
        classes: ko.observable(),
        isDelete: false
    };
   
    // add student
    self.AddStudent = function AddStudent(formElement) {
       
        var student = {
            codeView: self.newStudent.codeView(),
            name: self.newStudent.name(),
            address: self.newStudent.address(),
            birthDay: self.newStudent.birthDay(),
            phoneNumber: self.newStudent.phoneNumber(),
            genre: self.newStudent.genre(),
            classesId: self.newStudent.classes(),
            isDelete: self.newStudent.isDelete
        };
        ajaxHelper(studentsUri, 'POST', student).done(function (item) {
            self.listStudents.push(item);
            alert("Success");
            self.getAllStudentsCheck();
        });

    };
    // get data to text box when update
    self.GetDataToTB = function (item) {
        self.newStudent.id(item.id);
        self.newStudent.codeView(item.codeView);
        self.newStudent.name(item.name);
        self.newStudent.address(item.address);
        self.newStudent.birthDay(item.birthDay);
        self.newStudent.phoneNumber(item.phoneNumber);
        self.newStudent.genre(item.genre);
        self.newStudent.classes(item.classesId);

    };
    //update student
    self.updateStudent = function () {
      
        var student = {
            id: self.newStudent.id(),
            codeView: self.newStudent.codeView(),
            name: self.newStudent.name(),
            address: self.newStudent.address(),
            birthDay: self.newStudent.birthDay(),
            phoneNumber: self.newStudent.phoneNumber(),
            genre: self.newStudent.genre(),
            classesId: self.newStudent.classes(),
            isDelete: self.newStudent.isDelete
        };
        ajaxHelper(studentsUri + student.id, 'PUT', student).done(function () {
            alert("Update student success.");
            self.getAllStudentsCheck();
        });
    };
    // restore student
    self.RestoreStudent = function (item) {
        var student = {
            id: item.id,
            codeView: item.codeView,
            address: item.address,
            phoneNumber: item.phoneNumber,
            genre: item.genre,
            name: item.name,
            classesId: item.classesId,
            isDelete: false
        };
        var rs = confirm("Are you sure?");

        if (rs === true) {
            ajaxHelper(studentsUri + item.id, 'PATCH', student).done(function () {
                alert("Success");
                self.getAllStudentsDeleted();
            });
        }

    };
   //delete 
    self.DeleteStudent = function (item) {
        var rs = confirm("Are you sure?");
        if (rs === true) {
            ajaxHelper(studentsUri + item.id, 'DELETE').done(function () {
                alert("Success");
                self.listStudents.remove(item);
                self.getAllStudentsCheck();
            });
        }

    };
    //hide student
    self.HideStudent = function (item) {
        var student = {
            id: item.id,
            codeView: item.codeView,
            address: item.address,
            phoneNumber: item.phoneNumber,
            genre: item.genre,
            name: item.name,
            classesId: item.classesId,
            isDelete: true
        };
        var rs = confirm("Are you sure?");

        if (rs === true) {
            ajaxHelper(studentsUri + item.id, 'PUT', student).done(function () {
                alert("Success");
                self.getAllStudentsCheck();
                
            });
        }
    };
   
    
    // get list class
    self.listClass = ko.observableArray();
    var getAllClass = function () {
        ajaxHelper(classUri, 'GET').done(function (data) {
            self.listClass(data);
        });
    };
    getAllClass();
    
    
};

function checkPhone() {
    var phone = document.getElementById("Phone").value;
    if (phone.length > 12) {
        document.getElementById("errPhone").innerHTML = 'Please insert ....';
    }
    else {
        document.getElementById("errPhone").innerHTML = '';
    }
};

$(document).ready(function () {
    var VM = new ViewModels();
    VM.getAllStudentsCheck();
    ko.applyBindings(VM);
    
});
